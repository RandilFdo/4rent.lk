"use client";

import { useState } from "react";
import { sriLankanDistricts, getAllCities, getCitiesByDistrict } from "@/app/libs/sriLankanLocations";
import { SriLankanDistrict } from "@/app/types";

interface LocationSelectProps {
  value?: {
    district: string;
    city: string;
  };
  onChange: (location: { district: string; city: string }) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(value?.district || "");
  const [selectedCity, setSelectedCity] = useState<string>(value?.city || "");

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedCity(""); // Reset city when district changes
    onChange({ district, city: "" });
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    onChange({ district: selectedDistrict, city });
  };

  const availableCities = selectedDistrict ? getCitiesByDistrict(selectedDistrict as SriLankanDistrict) : [];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          District *
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select District</option>
          {sriLankanDistricts.map((district) => (
            <option key={district.value} value={district.value}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City *
        </label>
        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={!selectedDistrict}
          required
        >
          <option value="">Select City</option>
          {availableCities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelect;
