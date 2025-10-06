// Removed Prisma imports to prevent client-side bundling issues

// Define Prisma types manually to avoid client-side bundling
export interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string;
  price: number;
  mainCategory: string;
  subCategory: string;
  district: string;
  city: string;
  address?: string;
  priceUnit: string;
  status: string;
  expiresAt?: Date;
  lastRenewedAt?: Date;
  whatsappNumber?: string;
  contactPhone: string;
  isNegotiable: boolean;
  adminNotes?: string;
  viewCount: number;
  vehicleAttributes?: any;
  propertyAttributes?: any;
  experienceAttributes?: any;
  user?: User;
  reservations?: Reservation[];
}

export interface Reservation {
  id: string;
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  listing: Listing;
  user: User;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  phoneNumber: string | null;
  whatsappNumber: string | null;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: string[];
  listings?: Listing[];
  reservations?: Reservation[];
}

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

export type SafeListing = Omit<Listing, "createdAt" | "updatedAt" | "expiresAt" | "lastRenewedAt"> & {
   createdAt: string;
   updatedAt: string;
   expiresAt?: string;
   lastRenewedAt?: string;
   vehicleAttributes?: VehicleAttributes;
   propertyAttributes?: PropertyAttributes;
   experienceAttributes?: ExperienceAttributes;
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
