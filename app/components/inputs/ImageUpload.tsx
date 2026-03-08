"use client";

import Image from "next/image";
import { useCallback } from "react";
import { MdAddAPhoto } from "@react-icons/all-files/md/MdAddAPhoto";

interface ImageUploadProps {
   onChange: (value: string[]) => void;
   value: string[];
   maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, maxImages = 5 }) => {


   const removeImage = (index: number) => {
      const newImages = value.filter((_, i) => i !== index);
      onChange(newImages);
   };

   const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && value.length < maxImages) {
         // Always use data URL for immediate preview - this shows the actual image
         const reader = new FileReader();
         reader.onload = (e) => {
            const result = e.target?.result as string;
            onChange([...value, result]);
         };
         reader.readAsDataURL(file);
      }
   }, [onChange, value, maxImages]);

   return (
      <div className="space-y-4">
         {/* Image Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {value.map((image, index) => (
               <div key={index} className="relative aspect-square">
                  <Image
                     alt={`Upload ${index + 1}`}
                     fill
                     className="object-cover rounded-lg"
                     src={image}
                  />
                  <button
                     type="button"
                     onClick={() => removeImage(index)}
                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                     ×
                  </button>
               </div>
            ))}
            
            {/* Add More Button - Using manual upload instead of Cloudinary widget */}
            {value.length < maxImages && (
               <label className="aspect-square border-dashed border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center gap-2 text-gray-500 hover:border-gray-400 cursor-pointer transition-colors">
                  <MdAddAPhoto size={24} />
                  <span className="text-sm">Add photo</span>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleFileInput}
                     className="hidden"
                  />
               </label>
            )}
         </div>


         {/* Upload Progress Text */}
         <p className="text-sm text-gray-600">
            {value.length} of {maxImages} photos uploaded
         </p>
         
         {value.length === 0 && (
            <p className="text-sm text-red-600">
               You must upload at least one photo
            </p>
         )}
         
         {value.length > 0 && (
            <p className="text-sm text-green-600">
               ✅ Photos uploaded successfully!
            </p>
         )}
      </div>
   );
};
export default ImageUpload;
