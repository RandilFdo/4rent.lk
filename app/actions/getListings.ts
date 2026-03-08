import prisma from "@/app/libs/prismadb";
import { MainCategory, VehicleType, PropertyType, ExperienceType } from "@/app/types";

export interface IListingParams {
   userId?: string;
   search?: string; // Keyword search
   mainCategory?: MainCategory;
   district?: string;
   city?: string;
   minPrice?: number | string;
   maxPrice?: number | string;
   priceUnit?: string; // per day, per week, per month, per year
   vehicleType?: VehicleType;
   seats?: number | string;
   propertyType?: PropertyType;
   bedrooms?: number | string;
   bathrooms?: number | string;
   experienceType?: ExperienceType;
   maxParticipants?: number;
   difficultyLevel?: string;
   locationValue?: string;
   category?: string; // Legacy support
   guestCount?: number; // Legacy support
   roomCount?: number; // Legacy support
   bathroomCount?: number; // Legacy support
   startDate?: string; // Legacy support
   endDate?: string; // Legacy support
}

export default async function getListings(params: IListingParams) {
   try {
      const {
         userId,
         search, // Keyword search
         mainCategory,
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
         experienceType,
         maxParticipants,
         difficultyLevel,
         // Legacy parameters
         locationValue,
         category,
         roomCount,
         guestCount,
         bathroomCount,
         startDate,
         endDate,
      } = params;
      
      let query: any = {
         status: "APPROVED", // Only show approved listings
      };

      // Temporarily disable expiry filter to debug
      // TODO: Re-enable after fixing the issue
      // if (!userId) {
      //    const now = new Date();
      //    query.OR = [
      //       { expiresAt: null },
      //       { expiresAt: { gt: now } }
      //    ];
      // }

      // User filter
      if (userId) {
         query.userId = userId;
      }

      // Main category filter
      if (mainCategory) {
         query.mainCategory = mainCategory;
      } else if (category) {
         // Legacy support
         query.mainCategory = category;
      }

      // Location filters
      if (district) {
         query.district = district;
      }
      if (city) {
         query.city = city;
      }
      if (locationValue) {
         // Legacy support
         query.city = locationValue;
      }

      // Price filters - handle both string and number inputs
      if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
         const minPriceNum = typeof minPrice === 'string' ? parseInt(minPrice) : minPrice;
         if (!isNaN(minPriceNum) && minPriceNum > 0) {
            query.price = {
               ...query.price,
               gte: minPriceNum,
            };
         }
      }
      if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
         const maxPriceNum = typeof maxPrice === 'string' ? parseInt(maxPrice) : maxPrice;
         if (!isNaN(maxPriceNum) && maxPriceNum > 0) {
            query.price = {
               ...query.price,
               lte: maxPriceNum,
            };
         }
      }

      // Note: For MongoDB, we'll need to handle JSON field filtering differently
      // For now, we'll filter at the application level after fetching

      // Date availability (legacy support)
      if (startDate && endDate) {
         query.NOT = {
            reservations: {
               some: {
                  OR: [
                     {
                        endDate: { gte: startDate },
                        startDate: { lte: startDate },
                     },
                     {
                        startDate: { lte: endDate },
                        endDate: { gte: endDate },
                     },
                  ],
               },
            },
         };
      }

      console.log('Database query:', JSON.stringify(query, null, 2));
      
      const listings = await prisma.listing.findMany({
         where: query
      });
      
      console.log('Found listings:', listings.length);

      // Filter by JSON attributes at application level
      let filteredListings = listings;

      // Keyword search filter
      if (search) {
         const searchTerm = search.toLowerCase();
         filteredListings = filteredListings.filter((listing: any) => {
            // Search in title, description, and attributes
            const titleMatch = listing.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = listing.description.toLowerCase().includes(searchTerm);
            
            // Search in vehicle attributes
            let vehicleMatch = false;
            if (listing.vehicleAttributes) {
               const vehicle = listing.vehicleAttributes as any;
               vehicleMatch = 
                  (vehicle.brand && vehicle.brand.toLowerCase().includes(searchTerm)) ||
                  (vehicle.model && vehicle.model.toLowerCase().includes(searchTerm)) ||
                  (vehicle.vehicleType && vehicle.vehicleType.toLowerCase().includes(searchTerm));
            }
            
            // Search in property attributes
            let propertyMatch = false;
            if (listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               propertyMatch = 
                  (property.propertyType && property.propertyType.toLowerCase().includes(searchTerm));
            }
            
            // Search in experience attributes
            let experienceMatch = false;
            if (listing.experienceAttributes) {
               const experience = listing.experienceAttributes as any;
               experienceMatch = 
                  (experience.experienceType && experience.experienceType.toLowerCase().includes(searchTerm)) ||
                  (experience.languages && experience.languages.some((lang: string) => lang.toLowerCase().includes(searchTerm)));
            }
            
            return titleMatch || descriptionMatch || vehicleMatch || propertyMatch || experienceMatch;
         });
      }

      // Price unit filter
      if (priceUnit) {
         filteredListings = filteredListings.filter((listing: any) => {
            return listing.priceUnit?.toLowerCase().includes(priceUnit.toLowerCase());
         });
      }

      // Vehicle-specific filters
      if (mainCategory === "VEHICLE" || category === "VEHICLE") {
         filteredListings = filteredListings.filter((listing: any) => {
            if (vehicleType && listing.vehicleAttributes) {
               const vehicle = listing.vehicleAttributes as any;
               if (vehicle.vehicleType !== vehicleType) return false;
            }
            if (seats && listing.vehicleAttributes) {
               const vehicle = listing.vehicleAttributes as any;
               const seatsNum = typeof seats === 'string' ? parseInt(seats) : seats;
               if (vehicle.seats < seatsNum) return false;
            }
            return true;
         });
      }

      // Property-specific filters
      if (mainCategory === "PROPERTY" || category === "PROPERTY") {
         filteredListings = filteredListings.filter((listing: any) => {
            if (propertyType && listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               if (property.propertyType !== propertyType) return false;
            }
            if (bedrooms && listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               const bedroomsNum = typeof bedrooms === 'string' ? parseInt(bedrooms) : bedrooms;
               if (property.bedrooms < bedroomsNum) return false;
            }
            if (bathrooms && listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               const bathroomsNum = typeof bathrooms === 'string' ? parseInt(bathrooms) : bathrooms;
               if (property.bathrooms < bathroomsNum) return false;
            }
            return true;
         });
      }

      // Experience-specific filters
      if (mainCategory === "EXPERIENCE") {
         filteredListings = filteredListings.filter((listing: any) => {
            if (experienceType && listing.experienceAttributes) {
               const experience = listing.experienceAttributes as any;
               if (experience.experienceType !== experienceType) return false;
            }
            if (maxParticipants && listing.experienceAttributes) {
               const experience = listing.experienceAttributes as any;
               if (experience.maxParticipants < maxParticipants) return false;
            }
            if (difficultyLevel && listing.experienceAttributes) {
               const experience = listing.experienceAttributes as any;
               if (experience.difficultyLevel !== difficultyLevel) return false;
            }
            return true;
         });
      }

      // Legacy property filters
      if (roomCount) {
         filteredListings = filteredListings.filter((listing: any) => {
            if (listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               return property.bedrooms >= roomCount;
            }
            return false;
         });
      }
      if (guestCount) {
         filteredListings = filteredListings.filter((listing: any) => {
            if (listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               return property.bedrooms >= Math.ceil(guestCount / 2);
            }
            return false;
         });
      }
      if (bathroomCount) {
         filteredListings = filteredListings.filter((listing: any) => {
            if (listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               return property.bathrooms >= bathroomCount;
            }
            return false;
         });
      }

      // Sort by creation date (newest first)
      filteredListings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      const safeListings = filteredListings.map((listing: any) => ({
         ...listing,
         createdAt: listing.createdAt.toISOString(),
         updatedAt: listing.updatedAt.toISOString(),
         expiresAt: listing.expiresAt ? listing.expiresAt.toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to 30 days from now if not set
         lastRenewedAt: listing.lastRenewedAt ? listing.lastRenewedAt.toISOString() : undefined,
         vehicleAttributes: listing.vehicleAttributes as any,
         propertyAttributes: listing.propertyAttributes as any,
         experienceAttributes: listing.experienceAttributes as any
      }));

      return safeListings;
   } catch (error: any) {
      console.error('Error fetching listings:', error);
      return [];
   }
}
