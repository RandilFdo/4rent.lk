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

// const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({
   subsets: ["latin"],
   display: 'swap',
   preload: true,
});

export const metadata: Metadata = {
   metadataBase: new URL('https://4rent.lk'),
   title: "4Rent - Sri Lanka's Premier Rental Marketplace",
   description: "Find and rent vehicles and properties across Sri Lanka. Cars, bikes, apartments, houses and more.",
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
   robots: 'index, follow',
   openGraph: {
     title: "4Rent - Sri Lanka's Premier Rental Marketplace",
     description: "Find and rent vehicles and properties across Sri Lanka. Cars, bikes, apartments, houses and more.",
     type: 'website',
     locale: 'en_US',
   },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const currentUser = await getCurrentUser();
   return (
      <html lang="en">
         <head>
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
         </body>
      </html>
   );
}
