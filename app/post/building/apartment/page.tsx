"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import SinglePagePropertyForm from "../../../components/forms/SinglePagePropertyForm";


const ApartmentPostPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (formData: any) => {
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
          subCategory: 'apartment4rent',
          district: formData.location.district,
          city: formData.location.city,
          address: '',
          price: parseInt(formData.price),
          priceUnit: "per month",
          isNegotiable: formData.isNegotiable,
          contactPhone: formData.contactPhone,
          whatsappNumber: formData.contactPhone,
          propertyAttributes: {
            propertyType: 'APARTMENT',
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            isFurnished: formData.furnished,
            area: formData.area,
            parking: formData.parking,
            balcony: formData.balcony,
            security: formData.security,
            ac: formData.ac,
            wifi: formData.wifi,
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
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Container>
        <div className="text-center pt-32 mb-4">
          <Heading
            title="List Your Apartment for Rent"
            subtitle="Fill in the details of your apartment"
          />
        </div>
        
        <SinglePagePropertyForm
          propertyType="apartment"
          onComplete={handleComplete}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </Container>
    </div>
  );
};

export default ApartmentPostPage;
