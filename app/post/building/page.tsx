"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import Button from "../../components/Button";

type PropertyType = "house" | "apartment" | "commercial" | "room" | "holiday" | "land";

const BuildingPostPage = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<PropertyType | null>(null);

  const propertyTypes = [
    { 
      type: "house", 
      label: "house4rent", 
      icon: "🏠", 
      description: "Houses, Villas",
      details: []
    },
    { 
      type: "apartment", 
      label: "apartment4rent", 
      icon: "🏢", 
      description: "Apartments, Flats",
      details: []
    },
    { 
      type: "commercial", 
      label: "commercial4rent", 
      icon: "🏪", 
      description: "Offices, Shops, Warehouses",
      details: []
    },
    { 
      type: "room", 
      label: "room4rent", 
      icon: "🚪", 
      description: "Rooms, Annexes",
      details: []
    },
    { 
      type: "holiday", 
      label: "holiday4rent", 
      icon: "🏖️", 
      description: "Holiday rentals",
      details: []
    },
    { 
      type: "land", 
      label: "land4rent", 
      icon: "🌾", 
      description: "Agricultural, Commercial, Residential land",
      details: []
    },
  ];

  const handleTypeSelect = (type: PropertyType) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType) {
      router.push(`/post/building/${selectedType}`);
    }
  };

  return (
    <div className="pt-24 pb-12 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <Heading 
              title="Property4Rent" 
              subtitle="Choose the type of property you want to rent out" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyTypes.map((property, index) => (
              <div 
                key={property.type}
                onClick={() => handleTypeSelect(property.type as PropertyType)}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group card-hover scale-in ${
                  selectedType === property.type
                    ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-blue-50'
                    : 'hover:ring-2 hover:ring-purple-200'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{property.icon}</div>
                  <h3 className="text-lg font-bold gradient-text mb-2">{property.label}</h3>
                  <p className="text-sm text-gray-600 mb-3">{property.description}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    {property.details.map((detail, index) => (
                      <div key={index}>{detail}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 slide-in-left">
            <Button 
              label="Next" 
              onClick={handleNext}
              disabled={!selectedType}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BuildingPostPage;
