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

const CarPostPage = () => {
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
          subCategory: 'car4rent',
          district: formData.location.district,
          city: formData.location.city,
          address: '',
          price: parseInt(formData.price),
          priceUnit: formData.priceUnit,
          isNegotiable: formData.isNegotiable,
          contactPhone: formData.contactPhone,
          whatsappNumber: formData.contactPhone,
          vehicleAttributes: {
            vehicleType: 'CAR',
            brand: formData.brand,
            model: formData.model,
            year: formData.year ? parseInt(formData.year) : new Date().getFullYear(),
            transmission: formData.transmission,
            fuelType: formData.fuelType,
            seats: formData.seats,
            mileage: formData.mileage ? parseInt(formData.mileage) : null,
          },
          propertyAttributes: null,
        }),
      });

      if (response.ok) {
        alert('Your listing has been submitted for review! It will be published once approved by our admin team. You can check the status in your dashboard.');
        router.push('/dashboard');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Container>
        <div className="text-center pt-32 mb-4">
          <Heading title="Car4Rent" subtitle="Fill in the details of your car" />
        </div>
        
        <SinglePageVehicleForm
          vehicleType="CAR"
          onComplete={handleSubmit}
          onCancel={() => router.back()}
          isLoading={isLoading}
        />
      </Container>
    </div>
  );
};

export default CarPostPage;
