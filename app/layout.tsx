import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import SessionProvider from "./providers/SessionProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import ConditionalLayout from "./components/ConditionalLayout";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SWRProvider from "./providers/SWRProvider";
import PrefetchData from "./components/PrefetchData";
import GoogleAnalytics from "./components/GoogleAnalytics";

// const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({
   subsets: ["latin"],
   display: 'swap',
   preload: true,
});

export const metadata: Metadata = {
   metadataBase: new URL('https://4rent-lk-66uy.vercel.app'),
   title: {
      default: "4Rent - Sri Lanka's Premier Rental Marketplace",
      template: "%s | 4Rent Sri Lanka"
   },
   description: "Find and rent vehicles, properties, and experiences across Sri Lanka. Free platform for cars, bikes, apartments, houses, and unique experiences. No fees, no hidden costs.",
   keywords: [
      "rent", "sri lanka", "vehicles", "properties", "cars", "bikes", "apartments", 
      "houses", "rental marketplace", "colombo", "kandy", "galle", "negombo",
      "car rental sri lanka", "property rental", "apartment rent", "house rent",
      "vehicle rental", "bike rental", "scooter rental", "free rental platform"
   ],
   authors: [{ name: "4Rent Sri Lanka" }],
   creator: "4Rent Sri Lanka",
   publisher: "4Rent Sri Lanka",
   formatDetection: {
      email: false,
      address: false,
      telephone: false,
   },
   icons: {
     icon: [
       { url: '/favicon.ico', sizes: 'any' },
       { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
       { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
     ],
     shortcut: '/favicon-64x64.png',
     apple: '/favicon-64x64.png',
   },
   viewport: 'width=device-width, initial-scale=1',
   robots: {
      index: true,
      follow: true,
      googleBot: {
         index: true,
         follow: true,
         'max-video-preview': -1,
         'max-image-preview': 'large',
         'max-snippet': -1,
      },
   },
   openGraph: {
     title: "4Rent - Sri Lanka's Premier Rental Marketplace",
     description: "Find and rent vehicles, properties, and experiences across Sri Lanka. Free platform for cars, bikes, apartments, houses, and unique experiences.",
     url: 'https://4rent-lk-66uy.vercel.app',
     siteName: '4Rent Sri Lanka',
     images: [
       {
         url: '/images/white logo.png',
         width: 1200,
         height: 630,
         alt: '4Rent Sri Lanka - Rental Marketplace',
       },
     ],
     locale: 'en_US',
     type: 'website',
   },
   twitter: {
     card: 'summary_large_image',
     title: "4Rent - Sri Lanka's Premier Rental Marketplace",
     description: "Find and rent vehicles, properties, and experiences across Sri Lanka. Free platform for cars, bikes, apartments, houses, and unique experiences.",
     images: ['/images/white logo.png'],
     creator: '@4RentSriLanka',
   },
   alternates: {
     canonical: 'https://4rent-lk-66uy.vercel.app',
   },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const currentUser = await getCurrentUser();
   return (
      <html lang="en">
         <head>
            {/* Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-SY05YNLJ6D"></script>
            <script
               dangerouslySetInnerHTML={{
                  __html: `
                     window.dataLayer = window.dataLayer || [];
                     function gtag(){dataLayer.push(arguments);}
                     gtag('js', new Date());
                     gtag('config', 'G-SY05YNLJ6D');
                  `,
               }}
            />
            {/* Structured Data */}
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     "@context": "https://schema.org",
                     "@type": "WebSite",
                     "name": "4Rent Sri Lanka",
                     "description": "Sri Lanka's premier rental marketplace for vehicles, properties, and experiences",
                     "url": "https://4rent-lk-66uy.vercel.app",
                     "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://4rent-lk-66uy.vercel.app/?search={search_term_string}",
                        "query-input": "required name=search_term_string"
                     },
                     "publisher": {
                        "@type": "Organization",
                        "name": "4Rent Sri Lanka",
                        "url": "https://4rent-lk-66uy.vercel.app",
                        "logo": {
                           "@type": "ImageObject",
                           "url": "https://4rent-lk-66uy.vercel.app/images/white logo.png"
                        }
                     },
                     "sameAs": [
                        "https://facebook.com/4RentSriLanka",
                        "https://twitter.com/4RentSriLanka",
                        "https://instagram.com/4RentSriLanka"
                     ]
                  })
               }}
            />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
            <link rel="apple-touch-icon" sizes="64x64" href="/favicon-64x64.png" />
            <link rel="preload" href="/images/black logo.png" as="image" type="image/png" />
            <link rel="preload" href="/images/white logo.png" as="image" type="image/png" />
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
         </head>
         <body className={nunito.className}>
            <SessionProvider>
               <SWRProvider>
                  <ClientOnly>
                     <ToasterProvider />
                     <SearchModal />
                     <RentModal />
                     <LoginModal />
                     <RegisterModal />
                      <Navbar currentUser={currentUser as any} />
                  </ClientOnly>
               <div className="min-h-screen flex flex-col">
                  <ConditionalLayout>{children}</ConditionalLayout>
                  <div className="mt-auto">
                     <Footer />
                  </div>
               </div>
               <SpeedInsights />
               <PrefetchData />
               </SWRProvider>
            </SessionProvider>
            {/* Google Analytics */}
            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
               <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
            )}
         </body>
      </html>
   );
}
