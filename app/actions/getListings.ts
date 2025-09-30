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
   vehicleType?: VehicleType;
   seats?: number;
   propertyType?: PropertyType;
   bedrooms?: number;
   bathrooms?: number;
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
         where: query,
         include: {
            business: {
               select: {
                  verified: true,
                  status: true
               }
            }
         }
      });
      
      console.log('Found listings:', listings.length);

      // Filter by JSON attributes at application level
      let filteredListings = listings;

      // Keyword search filter
      if (search) {
         const searchTerm = search.toLowerCase();
         filteredListings = filteredListings.filter((listing) => {
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

      // Vehicle-specific filters
      if (mainCategory === "VEHICLE" || category === "VEHICLE") {
         filteredListings = filteredListings.filter((listing) => {
            if (vehicleType && listing.vehicleAttributes) {
               const vehicle = listing.vehicleAttributes as any;
               if (vehicle.vehicleType !== vehicleType) return false;
            }
            if (seats && listing.vehicleAttributes) {
               const vehicle = listing.vehicleAttributes as any;
               if (vehicle.seats < seats) return false;
            }
            return true;
         });
      }

      // Property-specific filters
      if (mainCategory === "PROPERTY" || category === "PROPERTY") {
         filteredListings = filteredListings.filter((listing) => {
            if (propertyType && listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               if (property.propertyType !== propertyType) return false;
            }
            if (bedrooms && listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               if (property.bedrooms < bedrooms) return false;
            }
            if (bathrooms && listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               if (property.bathrooms < bathrooms) return false;
            }
            return true;
         });
      }

      // Experience-specific filters
      if (mainCategory === "EXPERIENCE") {
         filteredListings = filteredListings.filter((listing) => {
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
         filteredListings = filteredListings.filter((listing) => {
            if (listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               return property.bedrooms >= roomCount;
            }
            return false;
         });
      }
      if (guestCount) {
         filteredListings = filteredListings.filter((listing) => {
            if (listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               return property.bedrooms >= Math.ceil(guestCount / 2);
            }
            return false;
         });
      }
      if (bathroomCount) {
         filteredListings = filteredListings.filter((listing) => {
            if (listing.propertyAttributes) {
               const property = listing.propertyAttributes as any;
               return property.bathrooms >= bathroomCount;
            }
            return false;
         });
      }

      // Apply ranking algorithm
      const rankedListings = filteredListings.map((listing) => {
         // Calculate ranking score
         let score = 0;
         
         // Featured ads get 1000 points
         if (listing.isFeatured) {
            score += 1000;
         }
         
         // Verified business ads get 500 points
         if (listing.business?.verified && (listing.business.status === 'trial' || listing.business.status === 'active')) {
            score += 500;
         }
         
         // Freshness factor: (1 / (daysSincePosted + 1)) * 100
         const now = new Date();
         const createdAt = new Date(listing.createdAt);
         const daysSincePosted = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
         const freshnessScore = (1 / (daysSincePosted + 1)) * 100;
         score += freshnessScore;
         
         return {
            ...listing,
            rankingScore: score
         };
      });

      // Sort by ranking score (descending)
      rankedListings.sort((a, b) => b.rankingScore - a.rankingScore);

      const safeListings = rankedListings.map((listing) => ({
         ...listing,
         createdAt: listing.createdAt.toISOString(),
         updatedAt: listing.updatedAt.toISOString(),
         expiresAt: listing.expiresAt ? listing.expiresAt.toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to 30 days from now if not set
         lastRenewedAt: listing.lastRenewedAt ? listing.lastRenewedAt.toISOString() : undefined,
         vehicleAttributes: listing.vehicleAttributes as any,
         propertyAttributes: listing.propertyAttributes as any,
         experienceAttributes: listing.experienceAttributes as any,
         businessVerified: listing.business?.verified || false,
         rankingScore: listing.rankingScore
      }));

      return safeListings;
   } catch (error: any) {
      console.error('Error fetching listings:', error);
      return [];
   }
}
