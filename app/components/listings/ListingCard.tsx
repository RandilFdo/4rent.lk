"use client";
import { SafeListing, SafeReservation, SafeUser, VehicleAttributes, PropertyAttributes } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
   data: SafeListing;
   reservation?: SafeReservation;
   onAction?: (id: string) => void;
   disabled?: boolean;
   actionLabel?: string;
   actionId?: string;
   currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
   data,
   reservation,
   onAction,
   disabled,
   actionLabel,
   actionId = "",
   currentUser,
}) => {
   const router = useRouter();
   
   const handleCancel = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
         e.stopPropagation();
         if (disabled) return;
         onAction?.(actionId);
      },
      [onAction, actionId, disabled]
   );

   const handleWhatsAppClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
         e.stopPropagation();
         const whatsappNumber = data.whatsappNumber || data.contactPhone;
         if (whatsappNumber) {
            const message = `Hi! I'm interested in your listing: ${data.title}`;
            window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
         }
      },
      [data.whatsappNumber, data.contactPhone, data.title]
   );

   const price = useMemo(() => {
      if (reservation) {
         return reservation.totalPrice;
      }
      return data.price;
   }, [reservation, data.price]);

   const reservationDate = useMemo(() => {
      if (!reservation) {
         return null;
      }
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      return `${format(start, "PP")} - ${format(end, "PP")}`;
   }, [reservation]);

   const getCategoryInfo = useMemo(() => {
      if (data.mainCategory === "VEHICLE" && data.vehicleAttributes) {
         const vehicle = data.vehicleAttributes as VehicleAttributes;
         const vehicleType = vehicle.vehicleType.replace(/_/g, '').toLowerCase();
         return {
            icon: "🚗",
            type: `${vehicleType}4rent`,
            details: `${vehicle.brand} ${vehicle.model} (${vehicle.year})`,
            specs: `${vehicle.seats} seats • ${vehicle.transmission} • ${vehicle.fuelType}`
         };
      } else if (data.mainCategory === "PROPERTY" && data.propertyAttributes) {
         const property = data.propertyAttributes as PropertyAttributes;
         return {
            icon: "🏠",
            type: `${property.propertyType.toLowerCase()}4rent`,
            details: property.isFurnished ? "Furnished" : "Unfurnished",
            specs: `${property.bedrooms} bed • ${property.bathrooms} bath`
         };
      }
      return {
         icon: data.mainCategory === "VEHICLE" ? "🚗" : "🏠",
         type: data.mainCategory === "VEHICLE" ? "vehicle4rent" : "property4rent",
         details: "",
         specs: ""
      };
   }, [data.mainCategory, data.vehicleAttributes, data.propertyAttributes]);

   return (
      <div
         onClick={() => router.push(`/listings/${data.id}`)}
         className="col-span-1 cursor-pointer group"
      >
         <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden card-hover">
            <div className="aspect-square w-full relative overflow-hidden">
               <Image
                  alt="Listing"
                  src={data.images[0] || '/images/placeholder.jpg'}
                  className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-200"
                  fill
               />
               <div className="absolute top-3 right-3">
                  <HeartButton listingId={data.id} currentUser={currentUser} />
               </div>
               {data.isFeatured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                     ⭐ Featured
                  </div>
               )}
            </div>
            
            <div className="flex flex-col flex-grow p-4 space-y-3 min-h-[120px]">
               {/* Title */}
               <div className="flex items-center gap-2">
                  <span className="text-lg">{getCategoryInfo.icon}</span>
                  <h3 className="font-bold text-lg truncate gradient-text">{data.title}</h3>
               </div>
               
               {/* Location */}
               <div className="font-medium text-gray-600 flex items-center gap-1">
                  <span className="text-sm">📍</span>
                  {data.city && data.district 
                    ? `${data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase()}, ${data.district.charAt(0).toUpperCase() + data.district.slice(1).toLowerCase()}`
                    : `${data.city || ''}, ${data.district || ''}`
                  }
               </div>
               
               {/* Category */}
               <div className="text-sm text-gray-700 capitalize font-medium">
                  {getCategoryInfo.type}
               </div>
               
               {/* Price - positioned at bottom */}
               <div className="mt-auto pt-2">
                  <div className="font-bold text-xl gradient-text">
                     LKR {price?.toLocaleString()}
                  </div>
                  <div className="font-medium text-sm text-gray-500">
                     {data.priceUnit || 'per day'}
                  </div>
               </div>
            </div>
            
            {onAction && actionLabel && (
               <div className="p-4 pt-0">
                  <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
               </div>
            )}
         </div>
      </div>
   );
};

export default ListingCard;
