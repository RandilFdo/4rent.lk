import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // Verify PayHere signature
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
    const receivedHash = data.hash;
    
    // Create hash from received data
    const hashString = `${data.merchant_id}${data.order_id}${data.payment_id}${data.payhere_amount}${data.payhere_currency}${data.status_code}${data.md5sig}`;
    const calculatedHash = crypto.createHash('md5').update(hashString + merchantSecret).digest('hex').toUpperCase();

    if (receivedHash !== calculatedHash) {
      console.error('PayHere webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Check if payment was successful
    if (data.status_code !== '2') {
      console.log('Payment not successful:', data.status_code);
      return NextResponse.json({ success: false, message: 'Payment not successful' });
    }

    // Extract order ID and find the listing
    const orderId = data.order_id as string;
    const listingId = orderId.split('_')[2]; // Extract from FEATURED_timestamp_listingId format

    if (!listingId) {
      console.error('Could not extract listing ID from order ID:', orderId);
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    // Update listing to featured status
    const featuredUntil = new Date();
    featuredUntil.setDate(featuredUntil.getDate() + 7); // 7 days from now

    await prisma.listing.update({
      where: { id: listingId },
      data: {
        isFeatured: true,
        featuredUntil: featuredUntil,
        status: 'APPROVED' // Ensure it's approved
      }
    });

    console.log(`Listing ${listingId} successfully featured until ${featuredUntil}`);

    return NextResponse.json({ success: true, message: 'Featured status updated' });

  } catch (error: any) {
    console.error('Featured webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
