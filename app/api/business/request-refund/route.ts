import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { reason, amount } = await request.json();

    if (!reason || !amount) {
      return NextResponse.json(
        { error: 'Reason and amount are required' },
        { status: 400 }
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

    // Check if there's already a pending refund request
    const existingRequest = await prisma.refundRequest.findFirst({
      where: {
        businessId: business.id,
        status: 'pending'
      }
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: 'You already have a pending refund request' },
        { status: 400 }
      );
    }

    // Create refund request
    const refundRequest = await prisma.refundRequest.create({
      data: {
        businessId: business.id,
        userId: user.id,
        amount: parseInt(amount),
        reason,
        status: 'pending'
      }
    });

    return NextResponse.json({
      success: true,
      refundRequest: {
        id: refundRequest.id,
        amount: refundRequest.amount,
        reason: refundRequest.reason,
        status: refundRequest.status,
        createdAt: refundRequest.createdAt
      }
    });

  } catch (error) {
    console.error('Refund request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
