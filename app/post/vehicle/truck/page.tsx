"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import SinglePageVehicleForm from "../../../components/forms/SinglePageVehicleForm";
import { VehicleType } from "../../../types";

interface VehicleFormData {
  // Location
  location: { district: string; city: string };
  
  // Vehicle Details
  brand: string;
  model: string;
  year: string;
  transmission: string;
  fuelType: string;
  seats: number;
  mileage: string;
  
  // Listing Details
  title: string;
  description: string;
  price: string;
  priceUnit: string;
  isNegotiable: boolean;
  
  // Media & Contact
  images: string[];
  contactPhone: string;
  contactName: string;
}

const TruckPostPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (formData: VehicleFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          mainCategory: 'VEHICLE',
          subCategory: 'truck4rent',
          vehicleType: 'TRUCK',
          vehicleAttributes: {
            vehicleType: 'TRUCK',
            brand: formData.brand,
            model: formData.model,
            year: parseInt(formData.year),
            transmission: formData.transmission,
            fuelType: formData.fuelType,
            seats: formData.seats,
            mileage: formData.mileage ? parseInt(formData.mileage) : null,
          }
        }),
      });

      if (response.ok) {
        alert('Your listing has been submitted for review! It will be published once approved by our admin team. You can check the status in your dashboard.');
        router.push('/dashboard');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create listing');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/post/vehicle');
  };

  return (
    <div className="pt-8 pb-12 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <Container>
        <div className="text-center mb-4">
          <Heading
            title="List Your Truck"
            subtitle="Fill in the details of your truck"
          />
        </div>
        
        <SinglePageVehicleForm
          vehicleType="TRUCK" as VehicleType
          onComplete={handleComplete}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </Container>
    </div>
  );
};

export default TruckPostPage;
