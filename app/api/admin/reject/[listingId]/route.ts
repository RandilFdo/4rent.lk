import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface IParams {
  listingId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin status
    const isAdmin = session.user.email.includes('admin') || 
                   (session.user as any).isAdmin === true;

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { listingId } = params;
    const { reason } = await request.json();

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 });
    }

    if (!reason || typeof reason !== "string") {
      return NextResponse.json({ error: "Rejection reason is required" }, { status: 400 });
    }

    // Update listing status to REJECTED with admin notes
    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: { 
        status: "REJECTED",
        adminNotes: reason,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ 
      message: "Listing rejected successfully",
      listing: updatedListing 
    });
  } catch (error) {
    console.error('Error rejecting listing:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
