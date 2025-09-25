"use client";
import { SafeListing, SafeUser } from "@/app/types";
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

   const formatPhoneNumber = (phone: string) => {
      // Hide middle digits for privacy
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1XXX$3');
   };

   return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-4">
         {/* Seller Information */}
         <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
               <Avatar src={user?.image} />
               <div>
                  <div className="font-semibold text-gray-900">{user?.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                     <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">MEMBER</span>
                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        ✓ VERIFIED SELLER
                     </span>
                  </div>
               </div>
            </div>
            <div className="text-sm text-gray-600">
               Member since {new Date(user?.createdAt || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
         </div>

         {/* Contact Information */}
         <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
            
            <div className="space-y-3">
               <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Phone Number</div>
                  <div className="font-medium text-gray-900">{formatPhoneNumber(listing.contactPhone)}</div>
                  <button className="text-blue-600 text-sm hover:underline mt-1">
                     Click to show phone number
                  </button>
               </div>

               <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                     <span>💬</span>
                     Chat
                  </button>
                  <a 
                     href={`https://wa.me/94${listing.whatsappNumber?.replace(/^0/, '')}`}
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
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
               <div className="flex items-start gap-3">
                  <div className="text-yellow-600 mt-1">🛡️</div>
                  <div>
                     <h4 className="font-semibold text-gray-900 mb-2">Stay Alert: Avoid Online Scams</h4>
                     <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Never share card details or OTPs, and always verify items in person before payment.</li>
                        <li>• 4Rent does not offer a delivery service. Stay vigilant!</li>
                     </ul>
                     <button className="text-blue-600 text-sm hover:underline mt-2">
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
