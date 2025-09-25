"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import SinglePagePropertyForm from "../../../components/forms/SinglePagePropertyForm";

interface PropertyFormData {
  // Location
  location: { district: string; city: string };
  
  // Property Details
  bedrooms: number;
  bathrooms: number;
  area: string;
  furnished: boolean;
  parking: boolean;
  garden: boolean;
  balcony: boolean;
  security: boolean;
  ac: boolean;
  wifi: boolean;
  
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

const LandPostPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (formData: PropertyFormData) => {
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
          mainCategory: 'PROPERTY',
          subCategory: 'land4rent',
          district: formData.location.district,
          city: formData.location.city,
          address: '',
          price: parseInt(formData.price),
          priceUnit: "per year",
          isNegotiable: formData.isNegotiable,
          contactPhone: formData.contactPhone,
          whatsappNumber: formData.contactPhone,
          propertyAttributes: {
            propertyType: 'LAND',
            bedrooms: 0,
            bathrooms: 0,
            isFurnished: false,
            area: formData.area,
            parking: false,
            garden: false,
            balcony: false,
            security: false,
            ac: false,
            wifi: false,
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
    router.push('/post/building');
  };

  return (
    <div className="pt-8 pb-12 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <Container>
        <div className="text-center mb-4">
          <Heading
            title="List Your Land for Rent"
            subtitle="Fill in the details of your land"
          />
        </div>
        
        <SinglePagePropertyForm
          propertyType="land"
          onComplete={handleComplete}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </Container>
    </div>
  );
};

export default LandPostPage;
