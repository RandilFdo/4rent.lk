"use client";

import useSWR from 'swr';
import { API_ENDPOINTS } from '@/app/libs/fetcher';
import { SafeListing } from '@/app/types/client';

interface UseListingsProps {
  mainCategory?: string;
  subCategory?: string;
  district?: string;
  city?: string;
  minPrice?: string;
  maxPrice?: string;
  priceUnit?: string;
  vehicleType?: string;
  seats?: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  search?: string;
  userId?: string;
}

export const useListings = (params: UseListingsProps = {}) => {
  const {
    mainCategory,
    subCategory,
    district,
    city,
    minPrice,
    maxPrice,
    priceUnit,
    vehicleType,
    seats,
    propertyType,
    bedrooms,
    bathrooms,
    search,
    userId
  } = params;

  // Build query string
  const queryParams = new URLSearchParams();
  if (mainCategory) queryParams.set('mainCategory', mainCategory);
  if (subCategory) queryParams.set('subCategory', subCategory);
  if (district) queryParams.set('district', district);
  if (city) queryParams.set('city', city);
  if (minPrice) queryParams.set('minPrice', minPrice);
  if (maxPrice) queryParams.set('maxPrice', maxPrice);
  if (priceUnit) queryParams.set('priceUnit', priceUnit);
  if (vehicleType) queryParams.set('vehicleType', vehicleType);
  if (seats) queryParams.set('seats', seats);
  if (propertyType) queryParams.set('propertyType', propertyType);
  if (bedrooms) queryParams.set('bedrooms', bedrooms);
  if (bathrooms) queryParams.set('bathrooms', bathrooms);
  if (search) queryParams.set('search', search);
  if (userId) queryParams.set('userId', userId);

  const queryString = queryParams.toString();
  const url = queryString ? `${API_ENDPOINTS.LISTINGS}?${queryString}` : API_ENDPOINTS.LISTINGS;

  const { data, error, isLoading, mutate } = useSWR<SafeListing[]>(
    url,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30s cache
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    listings: data || [],
    isLoading,
    error,
    mutate, // For manual revalidation
  };
};

// Specific category hooks for prefetching
export const useVehicles = () => useListings({ mainCategory: 'vehicles' });
export const useProperties = () => useListings({ mainCategory: 'properties' });
export const useExperiences = () => useListings({ mainCategory: 'experiences' });
export const useUserListings = (userId: string) => useListings({ userId });
