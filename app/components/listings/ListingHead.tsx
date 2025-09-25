"use client";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { useState } from "react";

interface ListingHeadProps {
   title: string;
   images: string[];
   locationValue: string;
   id: string;
   currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
   title,
   images,
   locationValue,
   id,
   currentUser,
}) => {
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
   };

   const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
   };

   return (
      <div className="space-y-4">
         {/* Main Image */}
         <div className="w-full h-[60vh] overflow-hidden rounded-xl relative group">
            <Image 
               alt={title} 
               src={images[currentImageIndex]} 
               fill 
               className="object-cover w-full" 
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
               <>
                  <button
                     onClick={prevImage}
                     className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                     ←
                  </button>
                  <button
                     onClick={nextImage}
                     className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                     →
                  </button>
               </>
            )}

            {/* Heart Button */}
            <div className="absolute top-5 right-5">
               <HeartButton listingId={id} currentUser={currentUser} />
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
               <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
               </div>
            )}
         </div>

         {/* Thumbnail Images */}
         {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
               {images.map((image, index) => (
                  <button
                     key={index}
                     onClick={() => setCurrentImageIndex(index)}
                     className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index 
                           ? 'border-blue-500' 
                           : 'border-gray-200 hover:border-gray-300'
                     }`}
                  >
                     <Image
                        alt={`${title} ${index + 1}`}
                        src={image}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                     />
                  </button>
               ))}
            </div>
         )}
      </div>
   );
};

export default ListingHead;
