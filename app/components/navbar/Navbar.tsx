"use client";

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NavbarProps {
   currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
   console.log({ currentUser });
   const pathname = usePathname();
   const router = useRouter();
   const searchParams = useSearchParams();

   const navItems = [
      { label: "Vehicles", href: "/?mainCategory=VEHICLE", icon: "🚗" },
      { label: "Properties", href: "/?mainCategory=PROPERTY", icon: "🏠" },
      { label: "Experiences", href: "/experiences", icon: "🎯" }
   ];

   const isActive = (href: string) => {
      if (href === "/experiences") {
         return pathname === "/experiences";
      }
      if (href.includes("mainCategory=VEHICLE")) {
         return pathname === "/" && searchParams?.get("mainCategory") === "VEHICLE";
      }
      if (href.includes("mainCategory=PROPERTY")) {
         return pathname === "/" && searchParams?.get("mainCategory") === "PROPERTY";
      }
      return false;
   };

   return (
      <div className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-10 shadow-lg border-b border-gray-100 dark:border-gray-700">
         <div className="py-2.5">
            <Container>
               <div className="flex flex-row items-center justify-between gap-0.5 sm:gap-1 fade-in">
                  <Logo />
                  
                  {/* Navigation Tabs - Centered on desktop */}
                  <div className="hidden md:flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1 absolute left-1/2 transform -translate-x-1/2">
                     {navItems.map((item) => (
                        <button
                           key={item.label}
                           onClick={() => router.push(item.href)}
                           className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                              isActive(item.href)
                                 ? "bg-white dark:bg-gray-700 shadow-md text-blue-600 dark:text-blue-400 font-medium"
                                 : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                           }`}
                        >
                           <span className="text-lg">{item.icon}</span>
                           <span className="text-sm">{item.label}</span>
                        </button>
                     ))}
                  </div>

                  {/* Mobile Navigation Tabs - Horizontal scroll */}
                  <div className="flex md:hidden items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-0.5 overflow-x-auto">
                     {navItems.map((item) => (
                        <button
                           key={item.label}
                           onClick={() => router.push(item.href)}
                           className={`flex items-center space-x-1 px-2 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap ${
                              isActive(item.href)
                                 ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium"
                                 : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                           }`}
                        >
                           <span className="text-sm">{item.icon}</span>
                           <span className="text-xs">{item.label}</span>
                        </button>
                     ))}
                  </div>

                  <UserMenu currentUser={currentUser} />
               </div>
            </Container>
         </div>
      </div>
   );
};
export default Navbar;
