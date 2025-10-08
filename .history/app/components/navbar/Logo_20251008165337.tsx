"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Logo = () => {
   const router = useRouter();
   const [isDarkMode, setIsDarkMode] = useState(false);

   useEffect(() => {
      // Check if dark mode is enabled
      const checkDarkMode = () => {
         const isDark = document.documentElement.classList.contains('dark') || 
                       (localStorage.getItem('theme') === 'dark') ||
                       (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
         setIsDarkMode(isDark);
      };

      // Check on mount
      checkDarkMode();

      // Listen for theme changes
      const observer = new MutationObserver(checkDarkMode);
      observer.observe(document.documentElement, {
         attributes: true,
         attributeFilter: ['class']
      });

      // Listen for storage changes (theme toggle)
      window.addEventListener('storage', checkDarkMode);

      return () => {
         observer.disconnect();
         window.removeEventListener('storage', checkDarkMode);
      };
   }, []);

   return (
      <div 
         onClick={() => router.push("/")}
         className="flex items-center cursor-pointer group"
      >
         <div className="relative">
            <Image
               src={isDarkMode ? "/images/white logo.png" : "/images/black logo.png"}
               alt="4Rent Logo"
               width={160}
               height={53}
               className="h-9 sm:h-11 md:h-13 w-auto transition-all duration-300 group-hover:scale-105"
               priority
            />
         </div>
         <span className="ml-2 sm:ml-3 text-xs sm:text-sm gradient-text font-semibold hidden lg:block transition-all duration-300 group-hover:scale-105">
            Sri Lanka
         </span>
      </div>
   );
};

export default Logo;
