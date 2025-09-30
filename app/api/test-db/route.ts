import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET() {
  try {
    // Test database connection
    const listingsCount = await prisma.listing.count();
    const approvedCount = await prisma.listing.count({
      where: { status: "APPROVED" }
    });
    const pendingCount = await prisma.listing.count({
      where: { status: "PENDING" }
    });

    // Get sample listings
    const sampleListings = await prisma.listing.findMany({
      take: 5,
      select: {
        id: true,
        title: true,
        status: true,
        mainCategory: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      database: {
        connected: true,
        totalListings: listingsCount,
        approved: approvedCount,
        pending: pendingCount
      },
      sampleListings,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      database: {
        connected: false
      }
    }, { status: 500 });
  }
}
