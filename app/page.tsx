export const dynamic = "force-dynamic";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import SearchBar from "./components/SearchBar";
import { MainCategory } from "./types";

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
      <ClientOnly>
         <Container>
            <div className="pt-8">
               {/* Search Bar */}
               <div className="mb-8">
                  <SearchBar />
               </div>
               
               {/* Results Header */}
               {listings.length > 0 && (
                  <div className="flex justify-between items-center mb-8">
                     <div>
                        <h2 className="text-3xl font-bold gradient-text">
                           {searchQuery ? `Search Results for "${searchQuery}"` : "Available Listings"}
                        </h2>
                        {currentCategory && (
                           <p className="text-gray-600 mt-2 text-lg">
                              Category: {currentCategory === "VEHICLE" ? "🚗 Vehicles" : "🏠 Properties"}
                           </p>
                        )}
                     </div>
                     <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full font-medium">
                        {listings.length} {listings.length === 1 ? "listing" : "listings"} found
                     </div>
                  </div>
               )}
               
               {listings.length === 0 ? (
                  <EmptyState 
                     showReset 
                     title={searchQuery ? `No results found for "${searchQuery}"` : "No listings found"}
                     subTitle="Try adjusting your search terms or filter criteria"
                  />
               ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 items-stretch">
                      {listings.map((listing: any) => (
                           <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
                     ))}
                  </div>
               )}
            </div>
         </Container>
      </ClientOnly>
   );
};

export default Home;
