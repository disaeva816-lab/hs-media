import type { Metadata, Viewport } from "next";

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
  title: "HS Media",
  description: "Система управления оборудованием школы",
  applicationName: "HS Media",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HS Media",
  },
};


export const viewport: Viewport = {
  themeColor: "#111827",
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
  position="bottom-center"
  closeButton={false}
  duration={2500}
  toastOptions={{
    classNames:{
      toast:
        "rounded-3xl shadow-lg border-0 px-5 py-4",
      title:
        "font-semibold",
      description:
        "text-sm text-gray-500",
    },
  }}
/>
      </body>


    </html>

  );

}