"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import SinglePageVehicleForm from "../../../components/forms/SinglePageVehicleForm";
import { VehicleType } from "../../../types";

interface VehicleFormData {
  location: { district: string; city: string };
  brand: string;
  model: string;
  year: string;
  transmission: string;
  fuelType: string;
  seats: number;
  mileage: string;
  title: string;
  description: string;
  price: string;
  priceUnit: string;
  isNegotiable: boolean;
  images: string[];
  contactPhone: string;
  contactName: string;
}

const BikePostPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: VehicleFormData) => {
    if (formData.images.length === 0) {
      alert('Please upload at least one photo');
      return;
    }

    if (!formData.title || !formData.description || !formData.price || !formData.contactPhone || !formData.brand || !formData.model || !formData.year || !formData.transmission || !formData.fuelType) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          images: formData.images,
          mainCategory: 'VEHICLE',
          subCategory: 'bike4rent',
          district: formData.location.district,
          city: formData.location.city,
          address: '',
          price: parseInt(formData.price),
          priceUnit: formData.priceUnit,
          isNegotiable: formData.isNegotiable,
          contactPhone: formData.contactPhone,
          whatsappNumber: formData.contactPhone,
          vehicleAttributes: {
            vehicleType: 'BIKE',
            brand: formData.brand,
            model: formData.model,
            year: formData.year ? parseInt(formData.year) : new Date().getFullYear(),
            transmission: formData.transmission,
            fuelType: formData.fuelType,
            seats: 2,
            mileage: formData.mileage ? parseInt(formData.mileage) : null,
          },
          propertyAttributes: null,
        }),
      });

      if (response.ok) {
        alert('Your listing has been submitted for review! It will be published once approved by our admin team. You can check the status in your dashboard.');
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create listing');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-8 pb-12 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <Container>
        <div className="text-center mb-4">
          <Heading
            title="List Your Bike for Rent"
            subtitle="Fill in the details below to create your listing"
          />
        </div>

        <SinglePageVehicleForm
          vehicleType="BIKE"
          onComplete={handleSubmit}
          onCancel={() => router.back()}
          isLoading={isLoading}
        />
      </Container>
    </div>
  );
};

export default BikePostPage;

