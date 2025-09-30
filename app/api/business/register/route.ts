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

    const { 
      businessName, 
      contactPerson, 
      contactNumber, 
      contactEmail, 
      category, 
      description, 
      address, 
      logoUrl 
    } = await request.json();

    if (!businessName || !contactPerson || !contactNumber || !contactEmail) {
      return NextResponse.json(
        { error: 'Business name, contact person, contact number, and contact email are required' },
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
        logoUrl: logoUrl || null,
        contactPerson,
        contactNumber,
        contactEmail,
        category: category || null,
        description: description || null,
        address: address || null,
        status: 'trial',
        trialEndDate,
        nextPaymentDue: trialEndDate,
        autoRenew: false,
        verified: true // Verified during trial period
      }
    });

    return NextResponse.json({
      success: true,
      business: {
        id: business.id,
        businessName: business.businessName,
        logoUrl: business.logoUrl,
        contactPerson: business.contactPerson,
        contactNumber: business.contactNumber,
        contactEmail: business.contactEmail,
        category: business.category,
        description: business.description,
        address: business.address,
        status: business.status,
        trialEndDate: business.trialEndDate,
        nextPaymentDue: business.nextPaymentDue,
        verified: business.verified
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
