import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId: string;
}

export async function POST(request: NextRequest, { params }: { params: IParams }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
      return NextResponse.json({ error: 'Invalid listing ID' }, { status: 400 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the listing and verify ownership
    const listing = await prisma.listing.findFirst({
      where: {
        id: listingId,
        userId: user.id
      }
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found or not owned by user' }, { status: 404 });
    }

    // Check if listing is expired
    if (listing.status !== 'EXPIRED') {
      return NextResponse.json({ error: 'Listing is not expired' }, { status: 400 });
    }

    // Set new expiry date (30 days from now)
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 30);

    // Update listing
    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: {
        status: 'APPROVED',
        expiresAt: newExpiresAt,
        lastRenewedAt: new Date(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Listing renewed successfully for another 30 days',
      listing: {
        id: updatedListing.id,
        status: updatedListing.status,
        expiresAt: updatedListing.expiresAt,
        lastRenewedAt: updatedListing.lastRenewedAt
      }
    });

  } catch (error: any) {
    console.error('Listing renewal error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}
