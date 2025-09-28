"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import SinglePageVehicleForm from "../../../components/forms/SinglePageVehicleForm";
import SinglePagePropertyForm from "../../../components/forms/SinglePagePropertyForm";
import { VehicleType } from "../../../types";
import { SafeListing } from "../../../types";

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

interface PropertyFormData {
  // Location
  location: { district: string; city: string };
  
  // Property Details
  propertyType: string;
  propertySize: string;
  landSize: string;
  bedrooms: number;
  bathrooms: number;
  furnished: string;
  parking: string;
  security: string;
  floor: string;
  address: string;
  
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

const EditListingPage = () => {
  const router = useRouter();
  const params = useParams();
  const listingId = params?.listingId as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<SafeListing | null>(null);

  useEffect(() => {
    if (listingId) {
      fetchListing();
    }
  }, [listingId]);

  const fetchListing = async () => {
    try {
      const response = await fetch(`/api/listings/${listingId}`);
      if (response.ok) {
        const listingData = await response.json();
        setListing(listingData);
      } else {
        alert('Listing not found');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      alert('Failed to fetch listing');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (formData: VehicleFormData) => {
    if (!listing) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          images: formData.images,
          mainCategory: listing.mainCategory,
          subCategory: listing.subCategory,
          district: formData.location.district,
          city: formData.location.city,
          address: '',
          price: parseInt(formData.price),
          priceUnit: formData.priceUnit,
          isNegotiable: formData.isNegotiable,
          contactPhone: formData.contactPhone,
          whatsappNumber: formData.contactPhone,
          vehicleAttributes: listing.vehicleAttributes ? {
            ...(listing.vehicleAttributes as any),
            brand: formData.brand,
            model: formData.model,
            year: parseInt(formData.year),
            transmission: formData.transmission,
            fuelType: formData.fuelType,
            seats: formData.seats,
            mileage: formData.mileage ? parseInt(formData.mileage) : null,
          } : undefined,
          propertyAttributes: listing.propertyAttributes
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update listing');
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <Container>
        <div className="pt-24">
          <div className="text-center">Loading listing...</div>
        </div>
      </Container>
    );
  }

  if (!listing) {
    return (
      <Container>
        <div className="pt-24">
          <div className="text-center">Listing not found</div>
        </div>
      </Container>
    );
  }

  // Prepare initial form data based on listing type
  const getInitialFormData = () => {
    if (listing.mainCategory === 'PROPERTY') {
      return {
        location: {
          district: listing.district || '',
          city: listing.city || ''
        },
        propertyType: listing.propertyAttributes?.propertyType || '',
        propertySize: listing.propertyAttributes?.propertySize?.toString() || '',
        landSize: listing.propertyAttributes?.landSize?.toString() || '',
        bedrooms: listing.propertyAttributes?.bedrooms || 1,
        bathrooms: listing.propertyAttributes?.bathrooms || 1,
        furnished: listing.propertyAttributes?.furnished || '',
        parking: listing.propertyAttributes?.parking || '',
        security: listing.propertyAttributes?.security || '',
        floor: listing.propertyAttributes?.floor?.toString() || '',
        address: listing.propertyAttributes?.address || '',
        title: listing.title || '',
        description: listing.description || '',
        price: listing.price?.toString() || '',
        priceUnit: listing.priceUnit || 'per month',
        isNegotiable: listing.isNegotiable || false,
        images: listing.images || [],
        contactPhone: listing.contactPhone || '',
        contactName: '' // This would need to be added to the listing model
      } as PropertyFormData;
    } else {
      return {
        location: {
          district: listing.district || '',
          city: listing.city || ''
        },
        brand: listing.vehicleAttributes?.brand || '',
        model: listing.vehicleAttributes?.model || '',
        year: listing.vehicleAttributes?.year?.toString() || '',
        transmission: listing.vehicleAttributes?.transmission || '',
        fuelType: listing.vehicleAttributes?.fuelType || '',
        seats: listing.vehicleAttributes?.seats || 5,
        mileage: listing.vehicleAttributes?.mileage?.toString() || '',
        title: listing.title || '',
        description: listing.description || '',
        price: listing.price?.toString() || '',
        priceUnit: listing.priceUnit || 'per day',
        isNegotiable: listing.isNegotiable || false,
        images: listing.images || [],
        contactPhone: listing.contactPhone || '',
        contactName: '' // This would need to be added to the listing model
      } as VehicleFormData;
    }
  };

  // Determine vehicle type from listing
  const getVehicleType = (): VehicleType => {
    if (listing.vehicleAttributes?.vehicleType) {
      return listing.vehicleAttributes.vehicleType as VehicleType;
    }
    return 'CAR'; // Default fallback
  };

  // Handle experience listings by redirecting to experience post page
  if (listing.mainCategory === 'EXPERIENCE') {
    router.push(`/post/experience?edit=${listingId}`);
    return null;
  }

  return (
    <div className="pt-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Container>
        <div className="text-center mb-4">
          <Heading
            title="Edit Your Listing"
            subtitle="Update the details of your listing"
          />
        </div>
        
        {listing.mainCategory === 'PROPERTY' ? (
          <SinglePagePropertyForm
            onComplete={handleComplete}
            onCancel={handleCancel}
            isLoading={isLoading}
            initialData={getInitialFormData() as PropertyFormData}
          />
        ) : (
          <SinglePageVehicleForm
            vehicleType={getVehicleType()}
            onComplete={handleComplete}
            onCancel={handleCancel}
            isLoading={isLoading}
            initialData={getInitialFormData() as VehicleFormData}
          />
        )}
      </Container>
    </div>
  );
};

export default EditListingPage;
