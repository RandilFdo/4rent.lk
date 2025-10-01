import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservation";
import RequireAuth from "@/app/components/RequireAuth";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: IParams }): Promise<Metadata> {
   const listing = await getListingById(params);
   
   if (!listing) {
      return {
         title: "Listing Not Found | 4Rent Sri Lanka",
         description: "The listing you're looking for could not be found.",
      };
   }

   const title = `${listing.title} | 4Rent Sri Lanka`;
   const description = `${listing.description.substring(0, 160)}... Located in ${listing.city}, ${listing.district}. Price: LKR ${listing.price.toLocaleString()}`;
   const image = listing.images?.[0] || '/images/placeholder.jpg';
   const url = `https://4rent-lk-66uy.vercel.app/listings/${listing.id}`;

   return {
      title,
      description,
      keywords: [
         `${listing.mainCategory.toLowerCase()} rental`,
         `${listing.mainCategory.toLowerCase()} sri lanka`,
         `${listing.city} ${listing.mainCategory.toLowerCase()}`,
         `${listing.district} rental`,
         "rental marketplace sri lanka",
         "4rent sri lanka"
      ],
      openGraph: {
         title,
         description,
         url,
         siteName: "4Rent Sri Lanka",
         images: [
            {
               url: image,
               width: 1200,
               height: 630,
               alt: title,
            },
         ],
         locale: "en_US",
         type: "website",
      },
      twitter: {
         card: "summary_large_image",
         title,
         description,
         images: [image],
         creator: "@4RentSriLanka",
      },
      alternates: {
         canonical: url,
      },
   };
}
interface IParams {
   listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
   const listing = await getListingById(params);
   const reservations = await getReservations(params);
   const currentUser = await getCurrentUser();

   if (!listing) {
      return (
         <ClientOnly>
            <EmptyState />
         </ClientOnly>
      );
   }

   return (
      <ClientOnly>
         <RequireAuth>
            <ListingClient listing={listing as any} currentUser={currentUser as any} reservations={reservations as any} />
         </RequireAuth>
      </ClientOnly>
   );
};

export default ListingPage;
