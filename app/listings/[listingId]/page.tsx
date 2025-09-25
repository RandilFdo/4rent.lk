import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservation";
import { redirect } from "next/navigation";
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

   // Require login to view listing details
   if (!currentUser) {
      redirect('/');
   }

   return (
      <ClientOnly>
         <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
      </ClientOnly>
   );
};

export default ListingPage;
