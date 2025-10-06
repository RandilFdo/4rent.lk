"use client";

import { SafeUser, SafeListing } from "@/app/types/client";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import useShare from "@/app/hooks/useShare";
import useAnalytics from "@/app/hooks/useAnalytics";

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
   const { share } = useShare();
   const { trackEvent } = useAnalytics();
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
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{listing.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                     Posted on {formatDate(listing.createdAt)}
                  </div>
                  {/* Always show location */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                     <span>📍</span>
                     <span>{listing.city}, {listing.district}</span>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button 
                     onClick={async () => {
                        const shareData = {
                           title: listing.title,
                           text: `Check out this ${listing.mainCategory?.toLowerCase() || 'listing'} on 4Rent: ${listing.title}`,
                           url: window.location.href,
                        };

                        const result = await share(shareData);
                        
                        // Track sharing event
                        trackEvent('share', 'listing', listing.mainCategory, 1);
                        
                        // Show feedback based on the sharing method used
                        if (result.method === 'clipboard' || result.method === 'clipboard-fallback') {
                           alert('Link copied to clipboard!');
                        } else if (result.method === 'cancelled') {
                           // User cancelled, no need to show anything
                        } else if (!result.success) {
                           alert('Unable to share. Please copy the link manually.');
                        }
                     }}
                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                     </svg>
                     Share
                  </button>
               </div>
            </div>
         </div>

         {/* Price Section */}
         <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4">
               <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(listing.price)}
               </div>
               <div className="text-lg text-gray-600 dark:text-gray-300">
                  {listing.priceUnit}
               </div>
               {listing.isNegotiable && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                     Negotiable
                  </div>
               )}
            </div>
         </div>

         {/* Vehicle/Property Details */}
         <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Details</h3>
            
            {listing.mainCategory === 'VEHICLE' && listing.vehicleAttributes && (
               <div className="grid grid-cols-2 gap-4">
                  {(listing.vehicleAttributes as any).brand && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Brand</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.vehicleAttributes as any).brand}</span>
                  </div>
                  )}
                  {(listing.vehicleAttributes as any).model && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Model</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.vehicleAttributes as any).model}</span>
                  </div>
                  )}
                  {(listing.vehicleAttributes as any).year && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Year</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.vehicleAttributes as any).year}</span>
                  </div>
                  )}
                  {(listing.vehicleAttributes as any).transmission && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Transmission</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.vehicleAttributes as any).transmission}</span>
                  </div>
                  )}
                  {(listing.vehicleAttributes as any).fuelType && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Fuel Type</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.vehicleAttributes as any).fuelType}</span>
                  </div>
                  )}
                  {(listing.vehicleAttributes as any).seats && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Seats</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.vehicleAttributes as any).seats}</span>
                  </div>
                  )}
                  {(listing.vehicleAttributes as any).mileage && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Mileage</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.vehicleAttributes as any).mileage} km</span>
                     </div>
                  )}
               </div>
            )}

            {listing.mainCategory === 'PROPERTY' && listing.propertyAttributes && (
               <div className="grid grid-cols-2 gap-4">
                  {(listing.propertyAttributes as any).propertyType && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Property Type</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).propertyType}</span>
                     </div>
                  )}
                  {(listing.propertyAttributes as any).propertySize && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Property Size</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).propertySize} sq ft</span>
                     </div>
                  )}
                  {(listing.propertyAttributes as any).landSize && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Land Size</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).landSize} perches</span>
                     </div>
                  )}
                  {(listing.propertyAttributes as any).bedrooms && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Bedrooms</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).bedrooms}</span>
                     </div>
                  )}
                  {(listing.propertyAttributes as any).bathrooms && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Bathrooms</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).bathrooms}</span>
                     </div>
                  )}
                  {(listing.propertyAttributes as any).furnished && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Furnished</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).furnished}</span>
                     </div>
                  )}
                  {(listing.propertyAttributes as any).parking && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Parking</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).parking}</span>
                     </div>
                  )}
                  {(listing.propertyAttributes as any).security && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Security</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).security}</span>
                     </div>
                  )}
                  {(listing.propertyAttributes as any).floor && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Floor</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).floor}</span>
                     </div>
                  )}
                  {(listing.propertyAttributes as any).address && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Address</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.propertyAttributes as any).address}</span>
                     </div>
                  )}
               </div>
            )}

            {listing.mainCategory === 'EXPERIENCE' && listing.experienceAttributes && (
               <div className="grid grid-cols-2 gap-4">
                  {(listing.experienceAttributes as any).experienceType && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Experience Type</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.experienceAttributes as any).experienceType}</span>
                     </div>
                  )}
                  {(listing.experienceAttributes as any).duration && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Duration</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.experienceAttributes as any).duration} hours</span>
                     </div>
                  )}
                  {(listing.experienceAttributes as any).maxParticipants && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Max Participants</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.experienceAttributes as any).maxParticipants} people</span>
                     </div>
                  )}
                  {(listing.experienceAttributes as any).minAge && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Minimum Age</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.experienceAttributes as any).minAge} years</span>
                     </div>
                  )}
                  {(listing.experienceAttributes as any).difficultyLevel && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Difficulty Level</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.experienceAttributes as any).difficultyLevel}</span>
                     </div>
                  )}
                  {(listing.experienceAttributes as any).languages && (listing.experienceAttributes as any).languages.length > 0 && (
                     <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Languages</span>
                        <span className="font-medium text-gray-900 dark:text-white">{(listing.experienceAttributes as any).languages.join(', ')}</span>
                     </div>
                  )}
                  {(listing.experienceAttributes as any).includes && (listing.experienceAttributes as any).includes.length > 0 && (
                     <div className="col-span-2 py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 block mb-2">What's Included</span>
                        <div className="flex flex-wrap gap-2">
                           {(listing.experienceAttributes as any).includes.map((item: string, index: number) => (
                              <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm">
                                 {item}
                              </span>
                           ))}
                  </div>
                  </div>
                  )}
                  {(listing.experienceAttributes as any).requirements && (listing.experienceAttributes as any).requirements.length > 0 && (
                     <div className="col-span-2 py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 block mb-2">Requirements</span>
                        <div className="flex flex-wrap gap-2">
                           {(listing.experienceAttributes as any).requirements.map((item: string, index: number) => (
                              <span key={index} className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-sm">
                                 {item}
                              </span>
                           ))}
                  </div>
                  </div>
                  )}
               </div>
            )}
         </div>

         {/* Description */}
         <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
               {description}
            </div>
         </div>


         {/* Location - Always show */}
         <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Location</h3>
            <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-300">
               <span className="text-2xl">📍</span>
               <span className="font-medium">{locationValue}</span>
            </div>
         </div>
      </div>
   );
};

export default ListingInfo;
