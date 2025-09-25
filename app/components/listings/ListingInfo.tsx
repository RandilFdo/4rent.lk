"use client";

import { SafeUser, SafeListing } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
   user: SafeUser;
   description: string;
   guestCount: number;
   roomCount: number;
   bathroomCount: number;
   category:
      | {
           icon: IconType;
           label: string;
           description: string;
        }
      | undefined;
   locationValue: string;
   listing: SafeListing;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
   user,
   description,
   guestCount,
   roomCount,
   bathroomCount,
   category,
   locationValue,
   listing,
}) => {
   const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-LK', {
         style: 'currency',
         currency: 'LKR',
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
      }).format(price);
   };

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
         day: 'numeric',
         month: 'short',
         hour: '2-digit',
         minute: '2-digit',
         hour12: true
      });
   };

   return (
      <div className="col-span-4 flex flex-col gap-8">
         {/* Header Section */}
         <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
               <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold text-gray-900">{listing.title}</div>
                  <div className="text-sm text-gray-600">
                     Posted on {formatDate(listing.createdAt)}, {listing.city}, {listing.district}
                  </div>
               </div>
               <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                     Share
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                     Save ad
                  </button>
               </div>
            </div>
         </div>

         {/* Price Section */}
         <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center gap-4">
               <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(listing.price)}
               </div>
               <div className="text-lg text-gray-600">
                  {listing.priceUnit}
               </div>
               {listing.isNegotiable && (
                  <div className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                     Negotiable
                  </div>
               )}
            </div>
         </div>

         {/* Vehicle/Property Details */}
         <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Details</h3>
            
            {listing.mainCategory === 'VEHICLE' && listing.vehicleAttributes && (
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Brand</span>
                     <span className="font-medium">{(listing.vehicleAttributes as any).brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Model</span>
                     <span className="font-medium">{(listing.vehicleAttributes as any).model}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Year</span>
                     <span className="font-medium">{(listing.vehicleAttributes as any).year}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Transmission</span>
                     <span className="font-medium">{(listing.vehicleAttributes as any).transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Fuel Type</span>
                     <span className="font-medium">{(listing.vehicleAttributes as any).fuelType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Seats</span>
                     <span className="font-medium">{(listing.vehicleAttributes as any).seats}</span>
                  </div>
                  {(listing.vehicleAttributes as any).mileage && (
                     <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Mileage</span>
                        <span className="font-medium">{(listing.vehicleAttributes as any).mileage} km</span>
                     </div>
                  )}
               </div>
            )}

            {listing.mainCategory === 'PROPERTY' && listing.propertyAttributes && (
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Property Type</span>
                     <span className="font-medium">{(listing.propertyAttributes as any).propertyType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Bedrooms</span>
                     <span className="font-medium">{(listing.propertyAttributes as any).bedrooms}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Bathrooms</span>
                     <span className="font-medium">{(listing.propertyAttributes as any).bathrooms}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                     <span className="text-gray-600">Furnished</span>
                     <span className="font-medium">{(listing.propertyAttributes as any).isFurnished ? 'Yes' : 'No'}</span>
                  </div>
               </div>
            )}
         </div>

         {/* Description */}
         <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
               {description}
            </div>
         </div>

         {/* Contact Information */}
         <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="flex items-center gap-4">
               <Avatar src={user?.image} />
               <div className="flex flex-col">
                  <div className="font-semibold text-gray-900">{user?.name}</div>
                  <div className="text-sm text-gray-600">4Rent Member</div>
               </div>
            </div>
            <div className="mt-4 flex gap-3">
               <a 
                  href={`tel:${listing.contactPhone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
               >
                  📞 Call
               </a>
               <a 
                  href={`https://wa.me/94${listing.whatsappNumber?.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
               >
                  💬 WhatsApp
               </a>
            </div>
         </div>

         {/* Location */}
         <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
            <div className="flex items-center gap-2 text-lg text-gray-700">
               <span className="text-2xl">📍</span>
               <span className="font-medium">{locationValue}</span>
            </div>
         </div>
      </div>
   );
};

export default ListingInfo;
