"use client";

import Link from "next/link";

import {
  Search,
  QrCode,
  Backpack,
  Building2,
  ChevronRight,
  UserRound,
} from "lucide-react";


import { useUser } from "@/context/UserContext";
import { useEquipment } from "@/context/EquipmentContext";



export default function Home() {


  const {
    user,
    userId,
    avatar,
  } = useUser();



  const {
    equipment,
  } = useEquipment();





  const myEquipmentCount =

  equipment.filter(

    (item:any) =>

      item.current_holder_id === userId

  ).length;







  return (


    <main className="min-h-screen bg-[#F7F8FA]">



      <div className="mx-auto max-w-md px-6 py-10">







        {/* Приветствие */}



        <div className="mb-3">



          <p className="text-sm text-gray-500">

            Добро пожаловать,

          </p>






          <div className="mt-3 flex items-center gap-3">



            {avatar ? (


              <img

                src={avatar}

                alt="Аватар"

                className="
                  h-18
                  w-18
                  rounded-full
                  object-cover
                "

              />


            ) : (


              <div
                 className="
                   flex
                   h-18
                   w-18
                   items-center
                   justify-center
                   rounded-full
                   bg-gray-100
                   text-blue-800
                  "
                >
               <UserRound size={24}/>
               
               </div>


            )}


            <h1

              className="
                text-3xl
                font-semibold
                tracking-tight
                text-gray-900
              "

            >

              {user}

            </h1>



          </div>




        </div>




        {/* Главное меню */}


        <div className="space-y-4">





          <MenuCard


            href="/search"


            icon={<Search size={26}/>}


            title="Поиск оборудования"


            subtitle="Найти колонку, микрофон или камеру"


          />









          <MenuCard


            href="/scan"


            icon={<QrCode size={26}/>}


            title="Сканировать QR"


            subtitle="Быстро найти оборудование"


          />


          <MenuCard


            href="/equipment?mine=true"


            icon={<Backpack size={26}/>}


            title="Моё оборудование"


            subtitle={
              `${myEquipmentCount} прибора закреплено за вами`
            }


          />



          <MenuCard


            href="/locations"


            icon={<Building2 size={26}/>}


            title="Помещения"


            subtitle="Посмотреть оборудование по зданиям"


          />






        </div>





      </div>



    </main>


  );


}



function MenuCard({

  href,

  icon,

  title,

  subtitle,

}: {


  href:string;


  icon:React.ReactNode;


  title:string;


  subtitle:string;


}) {



  return (



    <Link


      href={href}


      className="
        group
        block
        rounded-3xl
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "


    >






      <div className="
        flex
        items-center
        justify-between
      ">




        <div className="
          flex
          items-center
          gap-4
        ">






          <div

            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gray-100
              text-blue-800
            "

          >

            {icon}

          </div>







          <div>



            <h2 className="
              font-semibold
              text-gray-900
            ">


              {title}


            </h2>







            <p className="
              mt-1
              text-sm
              text-gray-500
            ">


              {subtitle}


            </p>





          </div>






        </div>







        <ChevronRight


          size={20}


          className="
            text-gray-300
            transition
            group-hover:text-gray-500
          "


        />





      </div>





    </Link>


  );


}