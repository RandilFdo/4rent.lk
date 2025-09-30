/**
 * React functional component that renders a listing page.
 *
 * @component
 * @example
 * const listing = {
 *   // listing data
 * };
 *
 * const currentUser = {
 *   // current user data
 * };
 *
 * const reservations = [
 *   // list of reservations
 * ];
 *
 * <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
 *
 * @param {Object} listing - An object containing the details of the listing.
 * @param {Object} currentUser - An object representing the currently logged-in user.
 * @param {Array} reservations - An array of objects representing existing reservations for the listing.
 *
 * @returns {JSX.Element} - The rendered listing page with the listing details, date range picker, and reservation button.
 */
"use client";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import { FaCar, FaHome } from "react-icons/fa";

const initialDateRange = {
   startDate: new Date(),
   endDate: new Date(),
   key: "selection",
};

interface ListingClientProps {
   reservations?: SafeReservation[];
   listing: SafeListing & {
      user: SafeUser;
   };
   currentUser?: SafeUser | null;
}

const ListingClient: React.FunctionComponent<ListingClientProps> = ({
   listing,
   currentUser,
   reservations = [],
}) => {
   const loginModal = useLoginModal();
   const router = useRouter();

   const disabledDates = useMemo(() => {
      let dates: Date[] = [];
      reservations.forEach((reservation) => {
         const range = eachDayOfInterval({
            start: new Date(reservation.startDate),
            end: new Date(reservation.endDate),
         });

         dates = [...dates, ...range];
      });
      return dates;
   }, [reservations]);

   const [isLoading, setIsLoading] = useState(false);
   const [totalPrice, setTotalPrice] = useState(listing.price);
   const [dateRange, setDateRange] = useState<Range>(initialDateRange);

   const onCreateReservation = useCallback(() => {
      if (!currentUser) {
         return loginModal.onOpen();
      }

      setIsLoading(true);

      axios
         .post("/api/reservations", {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
         })
         .then(() => {
            toast.success("Listing Reseerved");
            setDateRange(initialDateRange);
            // Redirect to  /trips
            router.push("/trips");
            router.refresh();
         })
         .catch(() => {
            toast.error("Something went wrong");
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

   useEffect(() => {
      if (dateRange.startDate && dateRange.endDate) {
         const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

         if (dayCount && listing.price) {
            setTotalPrice(dayCount * listing.price);
         } else {
            setTotalPrice(listing.price);
         }
      }
   }, [dateRange, listing.price]);

   // Increment view count when component mounts
   useEffect(() => {
      const incrementViewCount = async () => {
         try {
            await axios.post(`/api/listings/${listing.id}/view`);
         } catch (error) {
            console.error('Error incrementing view count:', error);
         }
      };

      incrementViewCount();
   }, [listing.id]);

   const category = useMemo(() => {
      // For now, we'll use a default category or create a dynamic one
      return {
         label: `${listing.mainCategory} - ${listing.subCategory}`,
         icon: listing.mainCategory === 'VEHICLE' ? FaCar : FaHome,
         description: `${listing.mainCategory} rental`
      };
   }, [listing.mainCategory, listing.subCategory]);
   return (
      <Container>
         <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
               <ListingHead
                  title={listing.title}
                  images={listing.images}
                  locationValue={`${listing.city}, ${listing.district}`}
                  id={listing.id}
                  currentUser={currentUser}
               />
               <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                  <ListingInfo
                     user={listing.user}
                     category={category}
                     description={listing.description}
                     roomCount={listing.propertyAttributes?.bedrooms || 0}
                     guestCount={listing.vehicleAttributes?.seats || 0}
                     bathroomCount={listing.propertyAttributes?.bathrooms || 0}
                     locationValue={`${listing.city}, ${listing.district}`}
                     listing={listing}
                  />
                  <div className="order-last md:order-last md:col-span-3 mb-10">
                     <ListingReservation
                        listing={listing}
                        user={listing.user}
                     />
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
};

export default ListingClient;
