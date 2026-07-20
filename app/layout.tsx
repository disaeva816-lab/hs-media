import type { Metadata } from "next";

import "./globals.css";


import {
  EquipmentProvider,
} from "@/context/EquipmentContext";


import {
  UserProvider,
} from "@/context/UserContext";


import BottomNavigation from "@/components/BottomNavigation";


import UserGuard from "@/components/UserGuard";

import { Toaster } from "sonner";







export const metadata: Metadata = {

  title: "Pulse",

  description: "Учет оборудования HS Media",

};









export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {



  return (

    <html lang="ru">


      <body className="
        bg-[#F7F8FA]
        antialiased
      ">


        <UserProvider>


          <EquipmentProvider>


            <UserGuard>


              <main className="
                min-h-screen
                pb-24
              ">

                {children}

              </main>



              <BottomNavigation />

   
            </UserGuard>


          </EquipmentProvider>


        </UserProvider>

       <Toaster
          position="top-center"
          richColors
          closeButton
        />
      </body>


    </html>

  );

}