"use client";

import { useState, useEffect } from "react";
import ListingCard from "./listings/ListingCard";
import EmptyState from "./EmptyState";
import { SkeletonGrid } from "./SkeletonLoader";
import { useListings } from "@/app/hooks/useListings";
import { SafeUser } from "@/app/types";

interface ListingsGridProps {
  currentUser: SafeUser | null;
  searchQuery?: string;
  mainCategory?: string;
  subCategory?: string;
  district?: string;
  city?: string;
  minPrice?: string;
  maxPrice?: string;
}

const ListingsGrid: React.FC<ListingsGridProps> = ({ 
  currentUser, 
  searchQuery,
  mainCategory,
  subCategory,
  district,
  city,
  minPrice,
  maxPrice
}) => {
  const { listings, isLoading, error } = useListings({
    mainCategory,
    subCategory,
    district,
    city,
    minPrice,
    maxPrice,
    search: searchQuery,
  });

  if (isLoading) {
    return <SkeletonGrid count={8} />;
  }

  if (error) {
    return (
      <EmptyState
        showReset 
        title="Error loading listings"
        subTitle="Please try refreshing the page"
      />
    );
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        showReset 
        title={searchQuery ? `No results found for "${searchQuery}"` : "No listings found"}
        subTitle="Try adjusting your search terms or filter criteria"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-stretch">
      {listings.map((listing: any) => (
        <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default ListingsGrid;
