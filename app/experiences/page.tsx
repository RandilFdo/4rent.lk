"use client";

import { useState, useEffect } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { SafeUser, SafeListing } from "../types/client";
import getCurrentUser from "../actions/getCurrentUser";

const ExperiencesPage = () => {
  const [listings, setListings] = useState<SafeListing[]>([]);
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get experiences listings via API
        const response = await fetch('/api/listings?mainCategory=EXPERIENCE');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const experienceListings = await response.json();
        console.log("Fetched experience listings:", experienceListings);
        
        // Ensure we have an array
        if (Array.isArray(experienceListings)) {
          setListings(experienceListings);
        } else {
          console.error("API returned non-array data:", experienceListings);
          setListings([]);
        }
        
        // Get current user
        const user = await getCurrentUser();
        setCurrentUser(user as any);
      } catch (error) {
        console.error("Error fetching data:", error);
        setListings([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh listings every 30 seconds to catch newly approved listings
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      // Fetch fresh listings via API and filter them
      const response = await fetch('/api/listings?mainCategory=EXPERIENCE');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const experienceListings = await response.json();
      console.log("Search - Fetched experience listings:", experienceListings);
      
      // Ensure we have an array
      if (Array.isArray(experienceListings)) {
        if (query.trim() === "") {
          setListings(experienceListings);
        } else {
          const filtered = experienceListings.filter(listing => 
            listing.title.toLowerCase().includes(query.toLowerCase()) ||
            listing.description.toLowerCase().includes(query.toLowerCase()) ||
            listing.city.toLowerCase().includes(query.toLowerCase())
          );
          console.log("Search - Filtered listings:", filtered);
          setListings(filtered);
        }
      } else {
        console.error("Search - API returned non-array data:", experienceListings);
        setListings([]);
      }
    } catch (error) {
      console.error("Error searching listings:", error);
      setListings([]);
    }
  };

  const experienceCategories = [
    { label: "Tour Guide", icon: "🗺️", type: "TOUR_GUIDE" },
    { label: "Snorkeling", icon: "🤿", type: "SNORKELING" },
    { label: "Surfing", icon: "🏄‍♂️", type: "SURFING" },
    { label: "Horse Riding", icon: "🐴", type: "HORSE_RIDING" },
    { label: "Boat Riding", icon: "⛵", type: "BOAT_RIDING" },
    { label: "Hiking", icon: "🥾", type: "HIKING" },
    { label: "Wildlife Safari", icon: "🦁", type: "WILDLIFE_SAFARI" },
    { label: "Cultural Tour", icon: "🏛️", type: "CULTURAL_TOUR" },
    { label: "Food Tour", icon: "🍛", type: "FOOD_TOUR" },
    { label: "Adventure Sports", icon: "🏔️", type: "ADVENTURE_SPORTS" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading amazing experiences..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-indigo-400/20"></div>
        <div className="relative">
          <Container>
            <div className="pt-32 sm:pt-40 pb-12 sm:pb-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight dark:text-white">
                  Discover Fun Activities You Can Do in{" "}
                  <span className="inline-block">
                    <span className="text-red-500">S</span>
                    <span className="text-yellow-500">r</span>
                    <span className="text-green-500">i</span>
                    <span className="text-orange-500">L</span>
                    <span className="text-red-500">a</span>
                    <span className="text-yellow-500">n</span>
                    <span className="text-green-500">k</span>
                    <span className="text-orange-500">a</span>
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  From thrilling adventures to cultural experiences, discover the best activities 
                  that make Sri Lanka truly special. Book your next unforgettable experience today!
                </p>
                
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8 sm:mb-16">
                  <SearchBar onSearch={handleSearch} />
                </div>

                {/* Experience Categories */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-4xl mx-auto mb-16 sm:mb-24">
                  {experienceCategories.map((category, index) => (
                    <div
                      key={category.type}
                      className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-purple-600 text-center leading-tight">
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
              title="No experiences found"
              subTitle="Be the first to share an amazing experience in Sri Lanka!"
              showReset
            />
          ) : (
            <>
              <div className="mt-8 sm:mt-16"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">
                    {searchQuery ? `Search Results for "${searchQuery}"` : "Available Experiences"}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
                    Discover amazing activities and experiences across Sri Lanka
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-2 sm:px-4 rounded-full font-medium self-start sm:self-auto">
                  {listings.length} {listings.length === 1 ? "experience" : "experiences"} found
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

export default ExperiencesPage;
