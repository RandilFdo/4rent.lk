import prisma from "@/app/libs/prismadb";
import { MainCategory, VehicleType, PropertyType } from "@/app/types";

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

      const listings = await prisma.listing.findMany({
         where: query,
         orderBy: [
            { isFeatured: "desc" }, // Featured listings first
            { createdAt: "desc" }
         ],
      });

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
            
            return titleMatch || descriptionMatch || vehicleMatch || propertyMatch;
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

      const safeListings = filteredListings.map((listing) => ({
         ...listing,
         createdAt: listing.createdAt.toISOString(),
         updatedAt: listing.updatedAt.toISOString(),
         vehicleAttributes: listing.vehicleAttributes as any,
         propertyAttributes: listing.propertyAttributes as any,
      }));

      return safeListings;
   } catch (error: any) {
      console.error('Error fetching listings:', error);
      // Return sample data when database is down
      return [
         {
            id: "sample-1",
            title: "Toyota Corolla 2020",
            description: "Well maintained car for rent. Perfect for city driving.",
            images: ["/images/placeholder.jpg"],
            mainCategory: "VEHICLE",
            subCategory: "car",
            district: "Colombo",
            city: "Colombo 03",
            address: "123 Main Street",
            price: 5000,
            priceUnit: "per day",
            isNegotiable: true,
            contactPhone: "+94771234567",
            whatsappNumber: "+94771234567",
            status: "APPROVED",
            isFeatured: false,
            adminNotes: null,
            viewCount: 0,
            userId: "sample-user",
            vehicleAttributes: {
               vehicleType: "CAR" as any,
               brand: "Toyota",
               model: "Corolla",
               year: 2020,
               transmission: "AUTO" as any,
               fuelType: "PETROL" as any,
               seats: 5,
               mileage: 50000
            },
            propertyAttributes: undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: {
               name: "Sample User",
               image: null
            }
         },
         {
            id: "sample-2",
            title: "Modern Apartment in Kandy",
            description: "Beautiful 2 bedroom apartment with city views.",
            images: ["/images/placeholder.jpg"],
            mainCategory: "PROPERTY",
            subCategory: "apartment",
            district: "Kandy",
            city: "Kandy",
            address: "456 Hill Street",
            price: 50000,
            priceUnit: "per month",
            isNegotiable: false,
            contactPhone: "+94771234568",
            whatsappNumber: "+94771234568",
            status: "APPROVED",
            isFeatured: true,
            adminNotes: null,
            viewCount: 0,
            userId: "sample-user-2",
            vehicleAttributes: undefined,
            propertyAttributes: {
               propertyType: "APARTMENT" as any,
               bedrooms: 2,
               bathrooms: 2,
               isFurnished: true,
               size: 1200
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: {
               name: "Property Owner",
               image: null
            }
         },
         {
            id: "sample-3",
            title: "Honda Civic 2019",
            description: "Reliable and fuel-efficient car for daily use.",
            images: ["/images/placeholder.jpg"],
            mainCategory: "VEHICLE",
            subCategory: "car",
            district: "Gampaha",
            city: "Negombo",
            address: "789 Beach Road",
            price: 4500,
            priceUnit: "per day",
            isNegotiable: true,
            contactPhone: "+94771234569",
            whatsappNumber: "+94771234569",
            status: "APPROVED",
            isFeatured: false,
            adminNotes: null,
            viewCount: 0,
            userId: "sample-user-3",
            vehicleAttributes: {
               vehicleType: "CAR" as any,
               brand: "Honda",
               model: "Civic",
               year: 2019,
               transmission: "AUTO" as any,
               fuelType: "PETROL" as any,
               seats: 5,
               mileage: 35000
            },
            propertyAttributes: undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: {
               name: "Car Owner",
               image: null
            }
         }
      ] as any;
   }
}
