"use client";

import Link from "next/link";

import {
  School,
  Building2,
  Trees,
  ChevronRight,
} from "lucide-react";

import { buildings } from "@/data/buildings";
import { useEquipment } from "@/context/EquipmentContext";



const buildingIcons: Record<string, React.ReactNode> = {


  "Гимназия": (
    <School size={28}/>
  ),


  "Прогимназия": (
    <Building2 size={28}/>
  ),


  "Детский сад": (
    <Trees size={28}/>
  ),


};








export default function LocationsPage(){


  const {
    equipment,
  } = useEquipment();






  return (

    <main className="
      min-h-screen
      bg-[#F7F8FA]
    ">


      <div className="
        mx-auto
        max-w-md
        px-6
        py-10
      ">




        <h1 className="
          text-3xl
          font-semibold
          tracking-tight
          text-gray-900
        ">

          Помещения

        </h1>




        <p className="
          mt-2
          text-gray-500
        ">

          Выберите здание

        </p>







        <div className="
          mt-8
          space-y-4
        ">





          {
            buildings.map((building)=>{



              const count =

                equipment.filter(

                  (item:any)=>

                    item.base_building === building.name

                ).length;






              return (


                <Link

                  key={building.name}

                  href={`/locations/${encodeURIComponent(
                    building.name
                  )}`}


                  className="
                    group
                    block
                    rounded-3xl
                    bg-white
                    p-5
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
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





                      <div className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gray-100
                        text-gray-600
                      ">

                        {
                          buildingIcons[
                            building.name
                          ]
                        }


                      </div>







                      <div>


                        <h2 className="
                          text-lg
                          font-semibold
                          text-gray-900
                        ">

                          {building.name}

                        </h2>




                        <p className="
                          mt-1
                          text-sm
                          text-gray-500
                        ">

                          {count} единиц оборудования

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


            })
          }






        </div>




      </div>



    </main>

  );


}