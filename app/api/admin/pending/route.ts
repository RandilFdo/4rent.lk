import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    // Temporarily allow all users for testing
    // In production, implement proper admin authentication

    // Get pending listings with user information
    const pendingListings = await prisma.listing.findMany({
      where: { status: "PENDING" },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(pendingListings);
  } catch (error) {
    console.error('Error fetching pending listings:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
