"use client";
import { SafeListing, SafeUser } from "@/app/types/client";
import Avatar from "../Avatar";

interface ListingReservationProps {
   listing: SafeListing;
   user: SafeUser;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
   listing,
   user,
}) => {
   const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-LK', {
         style: 'currency',
         currency: 'LKR',
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
      }).format(price);
   };


   return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-4">
         {/* Seller Information */}
         <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
               <Avatar src={user?.image} />
               <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{user?.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                     <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">MEMBER</span>
                     <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        ✓ VERIFIED SELLER
                     </span>
                  </div>
               </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
               Member since {new Date(user?.createdAt || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
         </div>

         {/* Contact Information */}
         <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h3>
            
            <div className="space-y-3">
               <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phone Number</div>
                  <div className="font-medium text-gray-900 dark:text-white">{listing.contactPhone}</div>
               </div>

               <div className="flex gap-2">
                  <a 
                     href={`tel:${listing.contactPhone}`}
                     className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                     <span>📞</span>
                     Call
                  </a>
                  <a 
                     href={`https://wa.me/94${(listing.whatsappNumber || listing.contactPhone).replace(/^0/, '')}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                     <span>📱</span>
                     WhatsApp
                  </a>
               </div>
            </div>
         </div>

         {/* Safety Tips */}
         <div className="p-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
               <div className="flex items-start gap-3">
                  <div className="text-yellow-600 dark:text-yellow-400 mt-1">🛡️</div>
                  <div>
                     <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Stay Alert: Avoid Online Scams</h4>
                     <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Never share card details or OTPs, and always verify items in person before payment.</li>
                        <li>• 4Rent does not offer a delivery service. Stay vigilant!</li>
                     </ul>
                     <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline mt-2">
                        See all safety tips
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ListingReservation;
