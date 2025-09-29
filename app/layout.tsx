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

// const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "4Rent - Sri Lanka's Premier Rental Marketplace",
   description: "Find and rent vehicles and properties across Sri Lanka. Cars, bikes, apartments, houses and more.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const currentUser = await getCurrentUser();
   return (
      <html lang="en">
         <body className={nunito.className}>
            <SessionProvider>
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
            </SessionProvider>
         </body>
      </html>
   );
}
