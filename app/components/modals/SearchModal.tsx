"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearch";
import { MainCategory, VehicleType, PropertyType, SriLankanDistrict } from "@/app/types";
import { sriLankanDistricts, getCitiesByDistrict } from "@/app/libs/sriLankanLocations";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import Heading from "../Heading";

enum STEPS {
   CATEGORY = 0,
   LOCATION = 1,
   FILTERS = 2,
}

const SearchModal = () => {
   const router = useRouter();
   const searchModal = useSearchModal();
   const params = useSearchParams();

   const [step, setStep] = useState(STEPS.CATEGORY);
   const [mainCategory, setMainCategory] = useState<MainCategory>("VEHICLE");
   const [district, setDistrict] = useState("");
   const [city, setCity] = useState("");
   const [minPrice, setMinPrice] = useState(0);
   const [maxPrice, setMaxPrice] = useState(100000);

   // Vehicle filters
   const [vehicleType, setVehicleType] = useState<VehicleType | "">("");
   const [seats, setSeats] = useState(1);

   // Property filters
   const [propertyType, setPropertyType] = useState<PropertyType | "">("");
   const [bedrooms, setBedrooms] = useState(1);
   const [bathrooms, setBathrooms] = useState(1);

   const onBack = useCallback(() => {
      setStep((value) => value - 1);
   }, []);

   const onNext = useCallback(() => {
      setStep((value) => value + 1);
   }, []);

   const onSubmit = useCallback(async () => {
      let currentQuery = {};

      if (params) {
         currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
         ...currentQuery,
         mainCategory,
         district,
         city,
         minPrice,
         maxPrice,
      };

      if (mainCategory === "VEHICLE") {
         if (vehicleType) updatedQuery.vehicleType = vehicleType;
         updatedQuery.seats = seats;
      } else {
         if (propertyType) updatedQuery.propertyType = propertyType;
         updatedQuery.bedrooms = bedrooms;
         updatedQuery.bathrooms = bathrooms;
      }

      const url = qs.stringifyUrl(
         {
            url: "/",
            query: updatedQuery,
         },
         { skipNull: true }
      );

      setStep(STEPS.CATEGORY);
      searchModal.onClose();
      router.push(url);
   }, [
      step,
      searchModal,
      mainCategory,
      district,
      city,
      minPrice,
      maxPrice,
      vehicleType,
      seats,
      propertyType,
      bedrooms,
      bathrooms,
      router,
      params,
   ]);

   const actionLabel = useMemo(() => {
      if (step === STEPS.FILTERS) {
         return "Search";
      }
      return "Next";
   }, [step]);

   const secondaryActionLabel = useMemo(() => {
      if (step === STEPS.CATEGORY) {
         return undefined;
      }
      return "Back";
   }, [step]);

   let bodyContent = (
      <div className="flex flex-col gap-8">
         <Heading title="What would you like to rent?" subtitle="Choose a category" />
         <div className="grid grid-cols-2 gap-4">
            <div
               onClick={() => setMainCategory("VEHICLE")}
               className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  mainCategory === "VEHICLE" 
                     ? "border-blue-500 bg-blue-50" 
                     : "border-gray-200 hover:border-gray-300"
               }`}
            >
               <div className="text-2xl mb-2">🚗</div>
               <div className="font-semibold">Vehicles</div>
               <div className="text-sm text-gray-600">Cars, Bikes, Vans</div>
            </div>
            <div
               onClick={() => setMainCategory("PROPERTY")}
               className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  mainCategory === "PROPERTY" 
                     ? "border-blue-500 bg-blue-50" 
                     : "border-gray-200 hover:border-gray-300"
               }`}
            >
               <div className="text-2xl mb-2">🏠</div>
               <div className="font-semibold">Properties</div>
               <div className="text-sm text-gray-600">Houses, Apartments</div>
            </div>
         </div>
      </div>
   );

   if (step === STEPS.LOCATION) {
      bodyContent = (
         <div className="flex flex-col gap-8">
            <Heading title="Where are you looking?" subtitle="Select your preferred location" />
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <select
                     value={district}
                     onChange={(e) => {
                        setDistrict(e.target.value);
                        setCity(""); // Reset city when district changes
                     }}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                     <option value="">Select District</option>
                     {sriLankanDistricts.map((districtOption) => (
                        <option key={districtOption.value} value={districtOption.value}>
                           {districtOption.name}
                        </option>
                     ))}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     disabled={!district}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                     <option value="">Select City</option>
                     {district && getCitiesByDistrict(district as SriLankanDistrict).map((cityOption) => (
                        <option key={cityOption.value} value={cityOption.value}>
                           {cityOption.name}
                        </option>
                     ))}
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (LKR)</label>
                     <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (LKR)</label>
                     <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     />
                  </div>
               </div>
            </div>
         </div>
      );
   }

   if (step === STEPS.FILTERS) {
      bodyContent = (
         <div className="flex flex-col gap-8">
            <Heading title="More filters" subtitle={`Customize your ${mainCategory.toLowerCase()} search`} />
            
            {mainCategory === "VEHICLE" ? (
               <div className="space-y-6">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                     <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     >
                        <option value="">Any Type</option>
                        <option value="CAR">Car</option>
                        <option value="VAN">Van</option>
                        <option value="SUV">SUV</option>
                        <option value="BIKE">Bike</option>
                        <option value="LUXURY">Luxury Car</option>
                        <option value="WEDDING_CAR">Wedding Car</option>
                        <option value="BUS">Bus</option>
                        <option value="THREE_WHEELER">Three Wheeler</option>
                     </select>
                  </div>
                  <Counter
                     onChange={(value) => setSeats(value)}
                     value={seats}
                     title="Seats"
                     subTitle="Minimum number of seats"
                  />
               </div>
            ) : (
               <div className="space-y-6">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                     <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     >
                        <option value="">Any Type</option>
                        <option value="HOUSE">House</option>
                        <option value="APARTMENT">Apartment</option>
                        <option value="ROOM">Room</option>
                        <option value="COMMERCIAL">Commercial</option>
                        <option value="VILLA">Villa</option>
                        <option value="BOUTIQUE_HOTEL">Boutique Hotel</option>
                     </select>
                  </div>
                  <Counter
                     onChange={(value) => setBedrooms(value)}
                     value={bedrooms}
                     title="Bedrooms"
                     subTitle="Minimum number of bedrooms"
                  />
                  <Counter
                     onChange={(value) => setBathrooms(value)}
                     value={bathrooms}
                     title="Bathrooms"
                     subTitle="Minimum number of bathrooms"
                  />
               </div>
            )}
         </div>
      );
   }

   return (
      <Modal
         isOpen={searchModal.isOpen}
         title="Search Filters"
         actionLabel={actionLabel}
         onSubmit={step === STEPS.FILTERS ? onSubmit : onNext}
         secondaryActionLabel={secondaryActionLabel}
         secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
         onClose={searchModal.onClose}
         body={bodyContent}
      />
   );
};

export default SearchModal;
