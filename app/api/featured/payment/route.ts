import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingId } = await request.json();

    if (!listingId) {
      return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 });
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the listing
    const listing = await prisma.listing.findFirst({
      where: {
        id: listingId,
        userId: user.id,
        status: 'APPROVED' // Only allow featuring approved listings
      }
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found or not approved' }, { status: 404 });
    }

    // Check if already featured
    if (listing.isFeatured && listing.featuredUntil && new Date(listing.featuredUntil) > new Date()) {
      return NextResponse.json({ error: 'Listing is already featured' }, { status: 400 });
    }

    // Generate order ID
    const orderId = `FEATURED_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // PayHere configuration
    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
    const amount = 300; // 300 LKR for featured ad
    const currency = 'LKR';
    const returnUrl = `${process.env.NEXTAUTH_URL}/featured/success?orderId=${orderId}`;
    const cancelUrl = `${process.env.NEXTAUTH_URL}/featured/cancel?orderId=${orderId}`;
    const notifyUrl = `${process.env.NEXTAUTH_URL}/api/featured/webhook`;

    // Create hash for PayHere
    const hashString = `${merchantId}${orderId}${amount}${currency}`;
    const hash = crypto.createHash('sha1').update(hashString + merchantSecret).digest('hex').toUpperCase();

    // PayHere request data
    const payHereData = {
      merchant_id: merchantId,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      first_name: user.name || 'User',
      last_name: '',
      email: user.email || '',
      phone: user.phoneNumber || '',
      address: '',
      city: '',
      country: 'Sri Lanka',
      order_id: orderId,
      items: `Featured Ad - ${listing.title}`,
      currency: currency,
      amount: amount,
      hash: hash
    };

    // Store pending payment in database (optional - for tracking)
    await prisma.listing.update({
      where: { id: listingId },
      data: {
        // We'll update this when payment is confirmed via webhook
      }
    });

    // Return PayHere form data for frontend to submit
    return NextResponse.json({
      success: true,
      orderId,
      payHereData,
      payHereUrl: 'https://sandbox.payhere.lk/pay/checkout' // Use sandbox for testing
    });

  } catch (error: any) {
    console.error('Featured payment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
