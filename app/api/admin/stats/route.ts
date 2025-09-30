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
