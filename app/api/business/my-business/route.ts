import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database using email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const business = await prisma.business.findFirst({
      where: { userId: user.id },
      include: {
        refundRequests: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!business) {
      return NextResponse.json({ error: 'No business found' }, { status: 404 });
    }

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
        autoRenew: business.autoRenew,
        verified: business.verified,
        createdAt: business.createdAt,
        updatedAt: business.updatedAt,
        refundRequests: business.refundRequests
      }
    });

  } catch (error) {
    console.error('Get business error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
