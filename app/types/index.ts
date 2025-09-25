import { Listing, Reservation, User } from "@prisma/client";

// Main categories
export type MainCategory = "VEHICLE" | "PROPERTY";

// Vehicle types
export type VehicleType = "CAR" | "VAN" | "SUV" | "BIKE" | "LUXURY" | "WEDDING_CAR" | "BUS" | "THREE_WHEELER";

// Property types
export type PropertyType = "HOUSE" | "APARTMENT" | "ROOM" | "COMMERCIAL" | "VILLA" | "BOUTIQUE_HOTEL";

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

// Sri Lankan districts
export type SriLankanDistrict = 
  | "COLOMBO" | "GAMPAHA" | "KALUTARA" | "KANDY" | "MATALE" | "NUWARA_ELIYA"
  | "GALLE" | "MATARA" | "HAMBANTOTA" | "JAFFNA" | "VAVUNIYA" | "MULLAITIVU"
  | "KILINOCHCHI" | "MANNAR" | "BATTICALOA" | "AMPARA" | "TRINCOMALEE"
  | "KURUNEGALA" | "PUTTALAM" | "ANURADHAPURA" | "POLONNARUWA"
  | "BADULLA" | "MONARAGALA" | "RATNAPURA" | "KEGALLE";

export type SafeListing = Omit<Listing, "createdAt" | "updatedAt"> & {
   createdAt: string;
   updatedAt: string;
   vehicleAttributes?: VehicleAttributes;
   propertyAttributes?: PropertyAttributes;
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
};
