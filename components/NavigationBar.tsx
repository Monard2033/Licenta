// components/NavigationBar.tsx
'use client'
import '@/app/globals.css';
import ProfileComponent from "@/components/ProfileComponent";
import NavButtons from "@/components/NavButtons";
import {usePathname} from "next/navigation";
import React from "react";
import {buttonVariants} from "@/components/ui/button";
const NavigationBar: React.FC = () => {
   const pathName = usePathname();
   if(pathName != "/login") {
       return (
           <header className="border-2 border-purple-500 bg-[#FFDEADFF] p-3">
               <nav>
                   <ul className="flex justify-between p-3 items-center">
                       <NavButtons />
                       <ProfileComponent/>
                   </ul>
               </nav>
           </header>
       );
   }
   else
       return <></>
};

export default NavigationBar;
