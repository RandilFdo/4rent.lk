"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
   const router = useRouter();

   return (
      <div 
         onClick={() => router.push("/")}
         className="hidden md:flex items-center cursor-pointer group"
      >
         <div className="relative">
            <Image
               src="/images/4rent-logo.png"
               alt="4Rent Logo"
               width={120}
               height={40}
               className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
               priority
            />
         </div>
         <span className="ml-3 text-sm gradient-text font-semibold hidden lg:block transition-all duration-300 group-hover:scale-105">
            Sri Lanka
         </span>
      </div>
   );
};

export default Logo;
