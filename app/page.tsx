export const revalidate = 30; // ISR - revalidate every 30 seconds
import { Metadata } from "next";
import { Suspense } from "react";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import SearchBar from "./components/SearchBar";
import ListingsGrid from "./components/ListingsGrid";
import CriticalLoader from "./components/CriticalLoader";
import { MainCategory } from "./types";

export const metadata: Metadata = {
  title: "4Rent - Sri Lanka's Premier Rental Marketplace",
  description: "Find and rent vehicles and properties across Sri Lanka. Cars, bikes, apartments, houses and more.",
  keywords: ["rent", "sri lanka", "vehicles", "properties", "cars", "bikes", "apartments"],
  openGraph: {
    title: "4Rent - Sri Lanka's Premier Rental Marketplace",
    description: "Find and rent vehicles and properties across Sri Lanka. Cars, bikes, apartments, houses and more.",
    type: "website",
  },
};

interface HomeProps {
   searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
   // Try to get listings, but don't fail if database is down
   let listings: any[] = [];
   try {
      listings = await getListings(searchParams);
   } catch (error) {
      console.error('Database connection failed, showing empty state:', error);
      listings = [];
   }
   
   // Don't require login for homepage - currentUser can be null
   const currentUser = await getCurrentUser();
   const currentCategory = (searchParams.mainCategory as MainCategory) || "";
   const searchQuery = searchParams.search || "";

   return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
         <ClientOnly>
            {/* Search Bar Centered */}
            <div className="flex justify-center py-12 sm:py-24 pt-24 sm:pt-36">
               <div className="w-full max-w-2xl px-4">
                  <SearchBar />
               </div>
            </div>
            
            {/* Results Section */}
            <div>
               <Container>
                  {/* Results Header */}
                  {listings.length > 0 && (
                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                        <div>
                           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text dark:text-white">
                              {searchQuery ? `Search Results for "${searchQuery}"` : "Available Listings"}
                           </h2>
                           {currentCategory && (
                              <p className="text-gray-600 dark:text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
                                 Category: {
                                    currentCategory === "VEHICLE" ? "🚗 Vehicles" : 
                                    currentCategory === "PROPERTY" ? "🏠 Properties" : 
                                    currentCategory === "EXPERIENCE" ? "🎯 Experiences" : ""
                                 }
                              </p>
                           )}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 sm:px-4 rounded-full font-medium self-start sm:self-auto">
                           {listings.length} {listings.length === 1 ? "listing" : "listings"} found
                        </div>
                     </div>
                  )}
                  
                  <Suspense fallback={<CriticalLoader />}>
                     <ListingsGrid 
                        currentUser={currentUser} 
                        searchQuery={searchQuery}
                        mainCategory={searchParams.mainCategory}
                        subCategory={searchParams.category}
                        district={searchParams.district}
                        city={searchParams.city}
                        minPrice={searchParams.minPrice?.toString()}
                        maxPrice={searchParams.maxPrice?.toString()}
                     />
                  </Suspense>
               </Container>
            </div>
         </ClientOnly>
      </div>
   );
};

export default Home;
