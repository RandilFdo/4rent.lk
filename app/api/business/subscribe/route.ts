import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';
import crypto from 'crypto';

const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID;
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;
const PAYHERE_BASE_URL = process.env.PAYHERE_BASE_URL || 'https://sandbox.payhere.lk/pay/checkout';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!PAYHERE_MERCHANT_ID || !PAYHERE_MERCHANT_SECRET) {
      return NextResponse.json(
        { error: 'PayHere configuration missing' },
        { status: 500 }
      );
    }

    // Get user from database using email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const business = await prisma.business.findFirst({
      where: { userId: user.id }
    });

    if (!business) {
      return NextResponse.json({ error: 'No business found' }, { status: 404 });
    }

    // Generate unique order ID
    const orderId = `BIZ_${business.id}_${Date.now()}`;
    const amount = 1500; // LKR 1,500 per month
    const currency = 'LKR';

    // Create hash for PayHere
    const hashString = `${PAYHERE_MERCHANT_ID}${orderId}${amount}${currency}${PAYHERE_MERCHANT_SECRET}`;
    const hash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

    // PayHere payment parameters
    const paymentData = {
      merchant_id: PAYHERE_MERCHANT_ID,
      return_url: `${process.env.NEXTAUTH_URL}/business/payment/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/business/payment/cancel`,
      notify_url: `${process.env.NEXTAUTH_URL}/api/business/payhere-webhook`,
      first_name: session.user.name || 'Business',
      last_name: 'Owner',
      email: session.user.email,
      phone: (business.contactInfo as any)?.phone || '',
      address: (business.contactInfo as any)?.address || '',
      city: 'Colombo',
      country: 'Sri Lanka',
      order_id: orderId,
      items: 'Business Subscription - Monthly',
      currency: currency,
      amount: amount.toString(),
      hash: hash,
      // Recurring payment parameters
      recurrence: '1 Month',
      duration: '12 Months'
    };

    // Create form data for PayHere
    const formData = new URLSearchParams();
    Object.entries(paymentData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Redirect to PayHere
    return NextResponse.json({
      success: true,
      redirect_url: `${PAYHERE_BASE_URL}?${formData.toString()}`,
      order_id: orderId
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
