import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin status - temporarily allow all users for testing
    const isAdmin = true;

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get stats
    const [
      totalListings,
      pendingListings,
      approvedListings,
      rejectedListings,
      featuredListings,
      totalViews,
      totalBusinesses,
      activeBusinesses,
      expiredBusinesses
    ] = await Promise.all([
      prisma.listing.count(),
      prisma.listing.count({ where: { status: "PENDING" } }),
      prisma.listing.count({ where: { status: "APPROVED" } }),
      prisma.listing.count({ where: { status: "REJECTED" } }),
      prisma.listing.count({ where: { isFeatured: true } }),
      prisma.listing.aggregate({
        _sum: { viewCount: true }
      }),
      prisma.business.count(),
      prisma.business.count({ where: { status: "active" } }),
      prisma.business.count({ where: { status: "expired" } })
    ]);

    return NextResponse.json({
      totalListings,
      pendingListings,
      approvedListings,
      rejectedListings,
      featuredListings,
      totalViews: totalViews._sum.viewCount || 0,
      totalBusinesses,
      activeBusinesses,
      expiredBusinesses
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
