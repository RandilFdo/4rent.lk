import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Unique Experiences in Sri Lanka | Tours, Activities & Adventures",
   description: "Discover amazing experiences in Sri Lanka. Book unique tours, cultural activities, adventure sports, and local experiences. Connect with local guides and create unforgettable memories.",
   keywords: [
      "sri lanka experiences", "sri lanka tours", "cultural experiences sri lanka", "adventure activities sri lanka",
      "local experiences colombo", "kandy cultural tours", "galle historical tours", "elephant orphanage tour",
      "tea plantation tours", "wildlife safari sri lanka", "beach activities sri lanka", "mountain hiking tours",
      "yoga retreats sri lanka", "cooking classes sri lanka", "ayurveda treatments", "local guide sri lanka",
      "experience marketplace sri lanka", "book experiences online", "unique activities sri lanka",
      "snorkeling sri lanka", "surfing sri lanka", "hiking sri lanka", "wildlife safari sri lanka"
   ],
   openGraph: {
      title: "Unique Experiences in Sri Lanka | Tours, Activities & Adventures",
      description: "Discover amazing experiences in Sri Lanka. Book unique tours, cultural activities, adventure sports, and local experiences. Connect with local guides and create unforgettable memories.",
      type: "website",
      url: "https://4rent-lk-66uy.vercel.app/experiences",
      images: [
         {
            url: "/images/white logo.png",
            width: 1200,
            height: 630,
            alt: "Unique Experiences in Sri Lanka - 4Rent",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Unique Experiences in Sri Lanka | Tours, Activities & Adventures",
      description: "Discover amazing experiences in Sri Lanka. Book unique tours, cultural activities, adventure sports, and local experiences. Connect with local guides and create unforgettable memories.",
      images: ["/images/white logo.png"],
   },
   alternates: {
      canonical: "https://4rent-lk-66uy.vercel.app/experiences",
   },
};

export default function ExperiencesLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return children;
}
