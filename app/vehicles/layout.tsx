import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Vehicle Rental in Sri Lanka | Cars, Bikes, Vans & More",
   description: "Rent vehicles in Sri Lanka. Find cars, bikes, vans, SUVs, luxury cars, and three-wheelers for rent in Colombo, Kandy, Galle, and other cities. Free rental marketplace with no hidden fees.",
   keywords: [
      "vehicle rental sri lanka", "car rent colombo", "bike rent kandy", "van rent galle",
      "suv rental sri lanka", "luxury car rent", "wedding car rental", "bus rental sri lanka",
      "three wheeler rent", "scooter rent sri lanka", "motorcycle rent", "auto rent sri lanka",
      "vehicle for rent colombo", "car hire kandy", "bike hire galle", "van hire negombo",
      "rental cars sri lanka", "vehicle marketplace sri lanka", "free vehicle listing",
      "car rental colombo airport", "bike rental kandy", "van rental galle fort"
   ],
   openGraph: {
      title: "Vehicle Rental in Sri Lanka | Cars, Bikes, Vans & More",
      description: "Rent vehicles in Sri Lanka. Find cars, bikes, vans, SUVs, luxury cars, and three-wheelers for rent in Colombo, Kandy, Galle, and other cities. Free rental marketplace with no hidden fees.",
      type: "website",
      url: "https://4rent-lk-66uy.vercel.app/vehicles",
      images: [
         {
            url: "/images/white logo.png",
            width: 1200,
            height: 630,
            alt: "Vehicle Rental in Sri Lanka - 4Rent",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Vehicle Rental in Sri Lanka | Cars, Bikes, Vans & More",
      description: "Rent vehicles in Sri Lanka. Find cars, bikes, vans, SUVs, luxury cars, and three-wheelers for rent in Colombo, Kandy, Galle, and other cities. Free rental marketplace with no hidden fees.",
      images: ["/images/white logo.png"],
   },
   alternates: {
      canonical: "https://4rent-lk-66uy.vercel.app/vehicles",
   },
};

export default function VehiclesLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return children;
}
