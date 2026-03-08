"use client";

import { useEffect } from 'react';
import { useVehicles, useProperties, useExperiences } from '@/app/hooks/useListings';

// This component prefetches data for all category pages
// It runs in the background to warm up the cache
const PrefetchData: React.FC = () => {
  // Prefetch vehicles data
  useVehicles();
  
  // Prefetch properties data  
  useProperties();
  
  // Prefetch experiences data
  useExperiences();

  return null; // This component doesn't render anything
};

export default PrefetchData;
