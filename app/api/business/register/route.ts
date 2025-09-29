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

    const { businessName, contactInfo } = await request.json();

    if (!businessName || !contactInfo?.phone || !contactInfo?.email) {
      return NextResponse.json(
        { error: 'Business name, phone, and email are required' },
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

    // Check if user already has a business
    const existingBusiness = await prisma.business.findFirst({
      where: { userId: user.id }
    });

    if (existingBusiness) {
      return NextResponse.json(
        { error: 'You already have a business registered' },
        { status: 400 }
      );
    }

    // Calculate trial end date (30 days from now)
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 30);

    // Create new business
    const business = await prisma.business.create({
      data: {
        userId: user.id,
        businessName,
        contactInfo: {
          phone: contactInfo.phone,
          email: contactInfo.email,
          address: contactInfo.address || ''
        },
        status: 'trial',
        trialEndDate,
        nextPaymentDue: trialEndDate,
        isVerified: false
      }
    });

    return NextResponse.json({
      success: true,
      business: {
        id: business.id,
        businessName: business.businessName,
        contactInfo: business.contactInfo,
        status: business.status,
        trialEndDate: business.trialEndDate,
        nextPaymentDue: business.nextPaymentDue,
        isVerified: business.isVerified
      }
    });

  } catch (error) {
    console.error('Business registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
