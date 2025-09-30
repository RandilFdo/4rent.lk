import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
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

    return NextResponse.json({
      totalListings,
      pendingListings,
      approvedListings,
      rejectedListings,
      totalViews: totalViews._sum.viewCount || 0
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
