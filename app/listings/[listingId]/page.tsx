import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservation";
import RequireAuth from "@/app/components/RequireAuth";
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
