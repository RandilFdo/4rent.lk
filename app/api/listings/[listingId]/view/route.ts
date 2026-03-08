import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
    }

    // Increment the view count
    const listing = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ viewCount: listing.viewCount });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



