"use client";

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
   currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
   console.log({ currentUser });

   return (
      <div className="fixed w-full bg-white/95 backdrop-blur-md z-10 shadow-lg border-b border-gray-100">
         <div className="py-4">
            <Container>
               <div className="flex flex-row items-center justify-between gap-3 md:gap-0 fade-in">
                  <Logo />
                  <UserMenu currentUser={currentUser} />
               </div>
            </Container>
         </div>
      </div>
   );
};
export default Navbar;
