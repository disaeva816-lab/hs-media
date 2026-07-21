"use client";


import Link from "next/link";

import {
  usePathname,
} from "next/navigation";


import {
  Home,
  QrCode,
  User,
} from "lucide-react";









export default function BottomNavigation() {


  const pathname = usePathname();







  return (

    <nav className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      border-t
      border-gray-100
      bg-white
      shadow-[0_-4px_12px_rgba(0,0,0,0.04)]
    ">


      <div className="
        mx-auto
        flex
        max-w-md
        items-center
        justify-around
        px-8
        py-2
      ">





        <NavItem

          href="/"

          active={
            pathname === "/"
          }

          icon={
            <Home size={26}/>
          }

          title="Главная"

        />








        <Link

          href="/scan"

          aria-label="Сканировать QR"

          className="
            flex
            flex-col
            items-center
            gap-0.5
            text-xs
            text-gray-600
          "

        >



          <div className="
            -mt-6
            flex
            h-[58px]
            w-[58px]
            items-center
            justify-center
            rounded-full
            bg-blue-950
            text-white
            shadow-lg
            ring-4
            ring-[#F7F8FA]
          ">


            <QrCode size={28}/>


          </div>





          <span className="
            mt-1
            font-medium
          ">

            Сканировать

          </span>



        </Link>









        <NavItem

          href="/profile"

          active={
            pathname.startsWith("/profile")
          }

          icon={
            <User size={26}/>
          }

          title="Профиль"

        />






      </div>


    </nav>

  );

}









function NavItem({

  href,

  active,

  icon,

  title,

}: {

  href:string;

  active:boolean;

  icon:React.ReactNode;

  title:string;

}) {



  return (

    <Link

      href={href}

      className={`
        flex
        flex-col
        items-center
        gap-1
        text-xs
        transition

        ${
          active

          ? "text-blue-900"

          : "text-blue-700"

        }
      `}

    >

      {icon}


      <span className="
        font-medium
      ">

        {title}

      </span>


    </Link>

  );

}