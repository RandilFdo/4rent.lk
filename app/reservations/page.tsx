export const dynamic = "force-dynamic";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return (
         <ClientOnly>
            <EmptyState title="Unauthorized" subTitle="Please login" />
         </ClientOnly>
      );
   }

   let reservations: any[] = [];
   try {
      reservations = await getReservations({
         authorId: currentUser?.id,
      });
   } catch (error) {
      console.error('Error fetching reservations:', error);
      reservations = [];
   }

   if (reservations.length === 0) {
      return (
         <ClientOnly>
            <EmptyState
               title="No reservations found"
               subTitle="Looks like you have no reservations on your properties"
            />
         </ClientOnly>
      );
   }

   return (
      <ClientOnly>
          <ReservationsClient reservations={reservations} currentUser={currentUser as any} />
      </ClientOnly>
   );
};

export default ReservationsPage;
