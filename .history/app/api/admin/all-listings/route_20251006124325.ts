import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin all-listings: Starting request');
    
    const listings = await prisma.listing.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('✅ Admin all-listings: Successfully fetched', listings.length, 'listings');
    return NextResponse.json(listings);

  } catch (error: any) {
    console.error('❌ Admin all-listings: Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { 
        error: 'Internal server error',
        debug: {
          message: error.message,
          type: error.constructor.name
        }
      },
      { status: 500 }
    );
  }
}
