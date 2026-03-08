import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    console.log('🔍 Admin stats: Starting request');
    
    // Temporarily allow all users for testing
    // In production, implement proper admin authentication

    // Get stats
    const [
      totalListings,
      pendingListings,
      approvedListings,
      rejectedListings,
      totalViews
    ] = await Promise.all([
      prisma.listing.count(),
      prisma.listing.count({ where: { status: "PENDING" } }),
      prisma.listing.count({ where: { status: "APPROVED" } }),
      prisma.listing.count({ where: { status: "REJECTED" } }),
      prisma.listing.aggregate({
        _sum: { viewCount: true }
      })
    ]);

    const result = {
      totalListings,
      pendingListings,
      approvedListings,
      rejectedListings,
      totalViews: totalViews._sum.viewCount || 0
    };

    console.log('✅ Admin stats: Successfully calculated stats:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Admin stats: Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      error: "Internal server error",
      debug: {
        message: error.message,
        type: error.constructor.name
      }
    }, { status: 500 });
  }
}
