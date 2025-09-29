import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import crypto from 'crypto';

const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!PAYHERE_MERCHANT_SECRET) {
      console.error('PayHere secret not configured');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    // Validate PayHere signature
    const receivedHash = body.hash;
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig
    } = body;

    // Create hash for validation
    const hashString = `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${PAYHERE_MERCHANT_SECRET}`;
    const calculatedHash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

    if (calculatedHash !== receivedHash) {
      console.error('Invalid PayHere signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Extract business ID from order ID
    const businessId = order_id.split('_')[1];
    
    if (!businessId) {
      console.error('Invalid order ID format');
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    // Check if payment was successful
    if (status_code === '2') {
      // Payment successful
      const nextPaymentDue = new Date();
      nextPaymentDue.setMonth(nextPaymentDue.getMonth() + 1);

      await prisma.business.update({
        where: { id: businessId },
        data: {
          status: 'active',
          nextPaymentDue,
          updatedAt: new Date()
        }
      });

      console.log(`Payment successful for business ${businessId}`);
    } else if (status_code === '0') {
      // Payment failed or cancelled
      await prisma.business.update({
        where: { id: businessId },
        data: {
          status: 'expired',
          updatedAt: new Date()
        }
      });

      console.log(`Payment failed for business ${businessId}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('PayHere webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (PayHere sometimes sends GET)
export async function GET(request: NextRequest) {
  return POST(request);
}
