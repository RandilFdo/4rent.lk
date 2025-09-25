import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
   listingId: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
   const { listingId } = params;

   if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
   }

   const listing = await prisma.listing.findUnique({
      where: {
         id: listingId,
      },
      include: {
         user: {
            select: {
               id: true,
               name: true,
               email: true,
               image: true,
            }
         }
      }
   });

   if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
   }

   return NextResponse.json(listing);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return NextResponse.error();
   }

   const { listingId } = params;

   if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
   }

   const body = await request.json();
   const {
      title,
      description,
      images,
      mainCategory,
      subCategory,
      district,
      city,
      address,
      price,
      priceUnit,
      isNegotiable,
      contactPhone,
      whatsappNumber,
      vehicleAttributes,
      propertyAttributes
   } = body;

   const listing = await prisma.listing.updateMany({
      where: {
         id: listingId,
         userId: currentUser.id,
      },
      data: {
         title,
         description,
         images,
         mainCategory,
         subCategory,
         district,
         city,
         address,
         price: parseInt(price),
         priceUnit,
         isNegotiable: isNegotiable || false,
         contactPhone,
         whatsappNumber,
         vehicleAttributes,
         propertyAttributes,
      }
   });

   return NextResponse.json(listing);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return NextResponse.error();
   }

   const { listingId } = params;

   if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
   }

   const listing = await prisma.listing.deleteMany({
      where: {
         id: listingId,
         userId: currentUser.id,
      },
   });

   return NextResponse.json(listing);
}
