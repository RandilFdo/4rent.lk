import { Listing, Reservation, User } from "@prisma/client";

// Main categories
export type MainCategory = "VEHICLE" | "PROPERTY" | "EXPERIENCE";

// Vehicle types
export type VehicleType = "CAR" | "VAN" | "SUV" | "BIKE" | "LUXURY" | "WEDDING_CAR" | "BUS" | "THREE_WHEELER" | "TRUCK";

// Property types
export type PropertyType = "HOUSE" | "APARTMENT" | "ROOM" | "COMMERCIAL" | "VILLA" | "BOUTIQUE_HOTEL";

// Experience types
export type ExperienceType = "TOUR_GUIDE" | "SNORKELING" | "SURFING" | "HORSE_RIDING" | "BOAT_RIDING" | "HIKING" | "WILDLIFE_SAFARI" | "CULTURAL_TOUR" | "FOOD_TOUR" | "ADVENTURE_SPORTS" | "OTHER";

// Transmission types
export type TransmissionType = "AUTO" | "MANUAL";

// Fuel types
export type FuelType = "PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC";

// Listing status
export type ListingStatus = "PENDING" | "APPROVED" | "REJECTED";

// Vehicle attributes interface
export interface VehicleAttributes {
  vehicleType: VehicleType;
  brand: string;
  model: string;
  year: number;
  transmission: TransmissionType;
  fuelType: FuelType;
  seats: number;
  mileage?: number;
  color?: string;
  features?: string[]; // AC, GPS, etc.
}

// Property attributes interface
export interface PropertyAttributes {
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  isFurnished: boolean;
  size?: number; // in square feet
  floor?: number;
  parking?: boolean;
  garden?: boolean;
  pool?: boolean;
  features?: string[]; // WiFi, AC, etc.
}

// Experience attributes interface
export interface ExperienceAttributes {
  experienceType: ExperienceType;
  duration: number; // in hours
  maxParticipants: number;
  minAge?: number;
  difficultyLevel: "EASY" | "MEDIUM" | "HARD";
  includes: string[]; // Equipment, meals, transport, etc.
  requirements: string[]; // What participants need to bring
  languages: string[]; // Languages the guide speaks
  seasonality?: string; // Best time of year
  safetyNotes?: string;
}

// Sri Lankan districts
export type SriLankanDistrict = 
  | "COLOMBO" | "GAMPAHA" | "KALUTARA" | "KANDY" | "MATALE" | "NUWARA_ELIYA"
  | "GALLE" | "MATARA" | "HAMBANTOTA" | "JAFFNA" | "VAVUNIYA" | "MULLAITIVU"
  | "KILINOCHCHI" | "MANNAR" | "BATTICALOA" | "AMPARA" | "TRINCOMALEE"
  | "KURUNEGALA" | "PUTTALAM" | "ANURADHAPURA" | "POLONNARUWA"
  | "BADULLA" | "MONARAGALA" | "RATNAPURA" | "KEGALLE";

export type SafeListing = Omit<Listing, "createdAt" | "updatedAt" | "expiresAt" | "lastRenewedAt" | "featuredUntil"> & {
   createdAt: string;
   updatedAt: string;
   expiresAt?: string;
   lastRenewedAt?: string;
   featuredUntil?: string;
   vehicleAttributes?: VehicleAttributes;
   propertyAttributes?: PropertyAttributes;
   experienceAttributes?: ExperienceAttributes;
   businessVerified?: boolean;
   rankingScore?: number;
};

export type SafeReservation = Omit<
   Reservation,
   "createdAt" | "startDate" | "endDate" | "listing"
> & {
   createdAt: string;
   startDate: string;
   endDate: string;
   listing: SafeListing;
};

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
   createdAt: string;
   updatedAt: string;
   role: string;
};
