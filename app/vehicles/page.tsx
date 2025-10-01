"use client";

import { useState, useEffect } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { SafeUser, SafeListing } from "../types";
import getCurrentUser from "../actions/getCurrentUser";

const VehiclesPage = () => {
  const [listings, setListings] = useState<SafeListing[]>([]);
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/listings?mainCategory=VEHICLE');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const vehicleListings = await response.json();
        
        if (Array.isArray(vehicleListings)) {
          setListings(vehicleListings);
        } else {
          setListings([]);
        }
        
        const user = await getCurrentUser();
        setCurrentUser(user as any);
      } catch (error) {
        console.error("Error fetching data:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      const response = await fetch('/api/listings?mainCategory=VEHICLE');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const vehicleListings = await response.json();
      
      if (Array.isArray(vehicleListings)) {
        if (query.trim() === "") {
          setListings(vehicleListings);
        } else {
          const filtered = vehicleListings.filter(listing => 
            listing.title.toLowerCase().includes(query.toLowerCase()) ||
            listing.description.toLowerCase().includes(query.toLowerCase()) ||
            listing.city.toLowerCase().includes(query.toLowerCase())
          );
          setListings(filtered);
        }
      } else {
        setListings([]);
      }
    } catch (error) {
      console.error("Error searching listings:", error);
      setListings([]);
    }
  };

  const vehicleCategories = [
    { label: "Cars", icon: "🚗", type: "CAR" },
    { label: "Vans", icon: "🚐", type: "VAN" },
    { label: "SUVs", icon: "🚙", type: "SUV" },
    { label: "Bikes", icon: "🏍️", type: "BIKE" },
    { label: "Luxury Cars", icon: "🚘", type: "LUXURY" },
    { label: "Wedding Cars", icon: "💒", type: "WEDDING_CAR" },
    { label: "Buses", icon: "🚌", type: "BUS" },
    { label: "Three Wheelers", icon: "🛺", type: "THREE_WHEELER" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading vehicles..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20"></div>
        <div className="relative">
          <Container>
            <div className="pt-32 sm:pt-40 pb-12 sm:pb-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight dark:text-white">
                  Rent{" "}
                  <span className="inline-block">
                    <span className="text-blue-500">V</span>
                    <span className="text-indigo-500">e</span>
                    <span className="text-purple-500">h</span>
                    <span className="text-pink-500">i</span>
                    <span className="text-blue-500">c</span>
                    <span className="text-indigo-500">l</span>
                    <span className="text-purple-500">e</span>
                    <span className="text-pink-500">s</span>
                  </span>{" "}
                  in Sri Lanka
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Find the perfect vehicle for your needs. Cars, bikes, vans, and more available 
                  for rent across Sri Lanka. Free marketplace with no hidden fees!
                </p>
                
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8 sm:mb-16">
                  <SearchBar onSearch={handleSearch} />
                </div>

                {/* Vehicle Categories */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto mb-16 sm:mb-24">
                  {vehicleCategories.map((category, index) => (
                    <div
                      key={category.type}
                      className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center leading-tight">
                        {category.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Listings Section */}
      <Container>
        <div>
          {!Array.isArray(listings) || listings.length === 0 ? (
            <EmptyState 
              title="No vehicles found"
              subTitle="Be the first to list a vehicle for rent in Sri Lanka!"
              showReset
            />
          ) : (
            <>
              <div className="mt-8 sm:mt-16"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">
                    {searchQuery ? `Search Results for "${searchQuery}"` : "Available Vehicles"}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
                    Find the perfect vehicle for your needs across Sri Lanka
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-2 sm:px-4 rounded-full font-medium self-start sm:self-auto">
                  {listings.length} {listings.length === 1 ? "vehicle" : "vehicles"} found
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-stretch">
                {listings.map((listing: SafeListing) => (
                  <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
      
      {/* Bottom Spacing */}
      <div className="pb-16 sm:pb-20"></div>
    </div>
  );
};

export default VehiclesPage;
