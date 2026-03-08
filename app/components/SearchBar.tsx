"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiSearch, BiFilter, BiX } from "react-icons/bi";
import { MainCategory, VehicleType, PropertyType } from "@/app/types";
import { sriLankanDistricts, getCitiesByDistrict } from "@/app/libs/sriLankanLocations";
import { SriLankanDistrict } from "@/app/types";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = memo(({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [mainCategory, setMainCategory] = useState<MainCategory | "">("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType | "">("");
  const [seats, setSeats] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.get("search");
    const category = searchParams?.get("mainCategory");
    const dist = searchParams?.get("district");
    const cityParam = searchParams?.get("city");
    const minPriceParam = searchParams?.get("minPrice");
    const maxPriceParam = searchParams?.get("maxPrice");
    const priceUnitParam = searchParams?.get("priceUnit");
    const vehicleTypeParam = searchParams?.get("vehicleType");
    const seatsParam = searchParams?.get("seats");
    const propertyTypeParam = searchParams?.get("propertyType");
    const bedroomsParam = searchParams?.get("bedrooms");
    const bathroomsParam = searchParams?.get("bathrooms");
    
    if (query) setSearchQuery(query);
    if (category) setMainCategory(category as MainCategory);
    if (dist) setDistrict(dist);
    if (cityParam) setCity(cityParam);
    if (minPriceParam) setMinPrice(minPriceParam);
    if (maxPriceParam) setMaxPrice(maxPriceParam);
    if (priceUnitParam) setPriceUnit(priceUnitParam);
    if (vehicleTypeParam) setVehicleType(vehicleTypeParam as VehicleType);
    if (seatsParam) setSeats(seatsParam);
    if (propertyTypeParam) setPropertyType(propertyTypeParam as PropertyType);
    if (bedroomsParam) setBedrooms(bedroomsParam);
    if (bathroomsParam) setBathrooms(bathroomsParam);
  }, [searchParams]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    // Basic search
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (mainCategory) params.set("mainCategory", mainCategory);
    if (district) params.set("district", district);
    if (city) params.set("city", city);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (priceUnit) params.set("priceUnit", priceUnit);
    
    // Vehicle filters
    if (mainCategory === "VEHICLE") {
      if (vehicleType) params.set("vehicleType", vehicleType);
      if (seats) params.set("seats", seats);
    }
    
    // Property filters
    if (mainCategory === "PROPERTY") {
      if (propertyType) params.set("propertyType", propertyType);
      if (bedrooms) params.set("bedrooms", bedrooms);
      if (bathrooms) params.set("bathrooms", bathrooms);
    }
    
    const queryString = params.toString();
    const url = queryString ? `/?${queryString}` : "/";
    
    if (onSearch) {
      onSearch(searchQuery.trim());
    } else {
      router.push(url);
    }
  }, [
    searchQuery, mainCategory, district, city, minPrice, maxPrice, priceUnit,
    vehicleType, seats, propertyType, bedrooms, bathrooms, onSearch, router
  ]);

  const handleDistrictChange = (newDistrict: string) => {
    setDistrict(newDistrict);
    setCity(""); // Reset city when district changes
  };

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setMainCategory("");
    setDistrict("");
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setPriceUnit("");
    setVehicleType("");
    setSeats("");
    setPropertyType("");
    setBedrooms("");
    setBathrooms("");
    router.push("/");
  }, [router]);

  return (
    <div className="w-full">
      {/* Main Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for vehicles, properties, or locations..."
              className="w-full px-3 py-2 pl-10 pr-24 sm:px-6 sm:py-4 sm:pl-14 sm:pr-36 text-sm sm:text-base text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 dark:focus:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300"
            />
            <BiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base sm:text-xl sm:left-5" />
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-base transition-colors ${
                showAdvancedFilters 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
              }`}
            >
              <BiFilter className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-xs sm:text-base"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="mt-3 max-w-4xl mx-auto px-2 sm:px-4">
          <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg">
          <div className="space-y-3 sm:space-y-4">
            {/* Category Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Category
              </label>
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {[
                  { value: "VEHICLE", label: "Vehicles", icon: "🚗" },
                  { value: "PROPERTY", label: "Properties", icon: "🏠" },
                  { value: "EXPERIENCE", label: "Experiences", icon: "🎯" }
                ].map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setMainCategory(category.value as MainCategory)}
                    className={`p-2 sm:p-3 rounded-md sm:rounded-lg border-2 transition-all text-xs sm:text-sm font-medium ${
                      mainCategory === category.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className="text-sm sm:text-lg mb-1">{category.icon}</div>
                    <div className="text-xs">{category.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm"
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
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!district}
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  <option value="">Select City</option>
                  {district && getCitiesByDistrict(district as SriLankanDistrict).map((cityOption) => (
                    <option key={cityOption.value} value={cityOption.value}>
                      {cityOption.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Min Price (LKR)
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Max Price (LKR)
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="100000"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Price Unit
                </label>
                <select
                  value={priceUnit}
                  onChange={(e) => setPriceUnit(e.target.value)}
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm"
                >
                  <option value="">Any Unit</option>
                  <option value="per day">Per Day</option>
                  <option value="per week">Per Week</option>
                  <option value="per month">Per Month</option>
                  <option value="per year">Per Year</option>
                </select>
              </div>
            </div>

            {/* Vehicle-specific filters */}
            {mainCategory === "VEHICLE" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm"
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
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Min Seats
                  </label>
                  <select
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm"
                  >
                    <option value="">Any Seats</option>
                    <option value="1">1+ Seats</option>
                    <option value="2">2+ Seats</option>
                    <option value="4">4+ Seats</option>
                    <option value="6">6+ Seats</option>
                    <option value="8">8+ Seats</option>
                  </select>
                </div>
              </div>
            )}

            {/* Property-specific filters */}
            {mainCategory === "PROPERTY" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm"
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
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Min Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm"
                  >
                    <option value="">Any</option>
                    <option value="1">1+ Bedrooms</option>
                    <option value="2">2+ Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Min Bathrooms
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm"
                  >
                    <option value="">Any</option>
                    <option value="1">1+ Bathrooms</option>
                    <option value="2">2+ Bathrooms</option>
                    <option value="3">3+ Bathrooms</option>
                    <option value="4">4+ Bathrooms</option>
                    <option value="5">5+ Bathrooms</option>
                  </select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 px-3 py-2 sm:px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md sm:rounded-lg font-medium transition-colors text-xs sm:text-sm"
              >
                Clear All Filters
              </button>
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(false)}
                className="flex-1 px-3 py-2 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md sm:rounded-lg font-medium transition-colors text-xs sm:text-sm"
              >
                Close Filters
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;