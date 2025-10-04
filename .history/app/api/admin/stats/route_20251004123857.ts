import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Temporarily disabled due to Prisma build issues
    // TODO: Re-enable after fixing Prisma client generation
    return NextResponse.json({
      totalListings: 0,
      pendingListings: 0,
      approvedListings: 0,
      rejectedListings: 0,
      totalViews: 0
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
