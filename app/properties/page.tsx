import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Properties for Rent in Sri Lanka | Houses, Apartments & More",
   description: "Find the perfect property for rent in Sri Lanka. Browse houses, apartments, rooms, and commercial spaces in Colombo, Kandy, Galle, and other cities. Free rental marketplace.",
   keywords: [
      "property rental sri lanka", "house rent colombo", "apartment rent kandy", "room rent galle",
      "commercial property rent", "villa rent sri lanka", "boutique hotel rent", "property for rent",
      "rental properties sri lanka", "colombo apartments", "kandy houses", "galle villas",
      "negombo property rent", "anuradhapura house rent", "jaffna apartment rent", "batticaloa property",
      "rental marketplace sri lanka", "free property listing", "sri lanka real estate"
   ],
   openGraph: {
      title: "Properties for Rent in Sri Lanka | Houses, Apartments & More",
      description: "Find the perfect property for rent in Sri Lanka. Browse houses, apartments, rooms, and commercial spaces in Colombo, Kandy, Galle, and other cities.",
      type: "website",
      url: "https://4rent-lk-66uy.vercel.app/properties",
      images: [
         {
            url: "/images/white logo.png",
            width: 1200,
            height: 630,
            alt: "Properties for Rent in Sri Lanka - 4Rent",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Properties for Rent in Sri Lanka | Houses, Apartments & More",
      description: "Find the perfect property for rent in Sri Lanka. Browse houses, apartments, rooms, and commercial spaces in Colombo, Kandy, Galle, and other cities.",
      images: ["/images/white logo.png"],
   },
   alternates: {
      canonical: "https://4rent-lk-66uy.vercel.app/properties",
   },
};

const PropertiesPage = async () => {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return (
         <ClientOnly>
            <EmptyState title="Unauthorized" subTitle="Please Login" />
         </ClientOnly>
      );
   }
   const listings = await getListings({ userId: currentUser.id });

   if (listings.length === 0) {
      return (
         <ClientOnly>
            <EmptyState
               title="No properties found"
               subTitle="Looks like you havn't reserved any property."
            />
         </ClientOnly>
      );
   }

   return (
      <ClientOnly>
          <PropertiesClient listings={listings} currentUser={currentUser as any} />
      </ClientOnly>
   );
};

export default PropertiesPage;
