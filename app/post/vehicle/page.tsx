"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import Button from "../../components/Button";

const VehiclePostPage = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const vehicleTypes = [
    { 
      type: "car", 
      label: "car4rent", 
      icon: "🚗", 
      description: "Cars, SUVs, Vans"
    },
    { 
      type: "bike", 
      label: "bike4rent", 
      icon: "🏍️", 
      description: "Motorcycles, Scooters"
    },
    { 
      type: "three-wheeler", 
      label: "threewheeler4rent", 
      icon: "🛺", 
      description: "Tuk-tuks, Three wheelers"
    },
    { 
      type: "bus", 
      label: "bus4rent", 
      icon: "🚌", 
      description: "Buses, Coaches"
    },
    { 
      type: "truck", 
      label: "truck4rent", 
      icon: "🚛", 
      description: "Trucks, Lorries"
    },
    { 
      type: "luxury", 
      label: "luxury4rent", 
      icon: "✨", 
      description: "Premium cars, Luxury SUVs"
    }
  ];

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType) {
      // Map the display types to the actual route types
      const routeMap: { [key: string]: string } = {
        'car': 'car',
        'bike': 'bike',
        'three-wheeler': 'three-wheeler',
        'bus': 'bus',
        'truck': 'truck',
        'luxury': 'luxury'
      };
      
      const routeType = routeMap[selectedType] || selectedType;
      router.push(`/post/vehicle/${routeType}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center pt-32 mb-8 sm:mb-12">
            <Heading
              title="What type of vehicle are you renting?"
              subtitle="Select the vehicle type to continue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {vehicleTypes.map((vehicle) => (
              <div
                key={vehicle.type}
                onClick={() => handleTypeSelect(vehicle.type)}
                className={`bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg cursor-pointer group card-hover ${
                  selectedType === vehicle.type 
                    ? 'ring-2 ring-purple-500 dark:ring-purple-400 bg-white dark:bg-gray-700 border-2 border-purple-300 dark:border-purple-500' 
                    : 'hover:ring-2 hover:ring-purple-200 dark:hover:ring-purple-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-200">
                    {vehicle.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold gradient-text dark:text-white mb-2">
                    {vehicle.label}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3">
                    {vehicle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              label="Continue"
              onClick={handleNext}
              disabled={!selectedType}
              className="px-8 py-3"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default VehiclePostPage;
