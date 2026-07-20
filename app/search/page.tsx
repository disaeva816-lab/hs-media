"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Search,
  MapPin,
  UserRound,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import {
  useEquipment,
} from "@/context/EquipmentContext";







function Status({

  status,

}:{

  status:string;

}){


  if(status === "working"){


    return (

      <div className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-green-50
        px-3
        py-1
        text-sm
        text-green-700
      ">


        <CheckCircle2 size={15}/>

        Исправно


      </div>

    );


  }







  if(status === "checking"){


    return (

      <div className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-orange-50
        px-3
        py-1
        text-sm
        text-orange-700
      ">


        <AlertTriangle size={15}/>

        На проверке


      </div>

    );


  }








  return (

    <div className="
      inline-flex
      items-center
      gap-2
      rounded-full
      bg-red-50
      px-3
      py-1
      text-sm
      text-red-700
    ">


      <XCircle size={15}/>

      Неисправно


    </div>

  );


}









export default function SearchPage(){



  const [

    query,

    setQuery,

  ] = useState("");







  const {

    equipment,

  } = useEquipment();








  const results = query.trim()

    ? equipment.filter((item:any)=>


        `

        ${item.name}

        ${item.brand}

        ${item.model}

        ${item.inventory_number}

        ${item.category}

        `

        .toLowerCase()

        .includes(

          query.toLowerCase()

        )


      )

    : [];









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
          text-gray-900
        ">


          Поиск оборудования


        </h1>






        <p className="
          mt-2
          text-sm
          text-gray-500
        ">


          Найдите оборудование по названию или номеру


        </p>









        <div className="
          mt-8
          flex
          items-center
          gap-3
          rounded-3xl
          bg-white
          px-5
          py-4
          shadow-sm
        ">



          <Search

            size={22}

            className="text-gray-400"

          />





          <input

            autoFocus

            className="
              w-full
              outline-none
              text-gray-900
            "

            placeholder="Например: JBL"

            value={query}

            onChange={(e)=>

              setQuery(

                e.target.value

              )

            }

          />




        </div>









        <div className="
          mt-8
          space-y-4
        ">







          {
            results.map((item:any)=>(


              <Link

                key={item.id}

                href={`/equipment/${item.id}`}

                className="
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








                <h2 className="
                  text-lg
                  font-semibold
                  text-gray-900
                ">


                  {item.name}


                </h2>









                <div className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-500
                ">


                  <MapPin size={16}/>



                  <span>


                    {
                      item.current_building

                        ?

                        `${item.current_building}, ${item.current_room}`

                        :

                        "Без места"

                    }


                  </span>


                </div>









                <div className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-500
                ">


                  <UserRound size={16}/>



                  <span>


                    {

                      item.current_holder_name

                      ||

                      "Свободно"


                    }


                  </span>


                </div>









                <div className="
                  mt-4
                ">


                  <Status

                    status={

                      item.status || "checking"

                    }

                  />


                </div>







              </Link>


            ))

          }









          {
            query && results.length === 0 && (


              <div className="
                rounded-3xl
                bg-white
                p-6
                text-center
                text-gray-500
                shadow-sm
              ">


                Ничего не найдено


              </div>


            )

          }








        </div>






      </div>


    </main>

  );


}