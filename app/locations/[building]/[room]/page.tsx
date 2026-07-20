"use client";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  UserRound,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";


import {
  useEquipment,
  type Equipment,
} from "@/context/EquipmentContext";








function StatusBadge({

  status,

}:{

  status:string;

}) {



  if(status === "working"){


    return (

      <div className="
        inline-flex
        items-center
        gap-1.5
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
        gap-1.5
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
      gap-1.5
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









export default function RoomPage(){



  const params = useParams();


  const router = useRouter();





  const building = decodeURIComponent(

    String(params.building || "")

  );




  const room = decodeURIComponent(

    String(params.room || "")

  );









  const {

    equipment,

  } = useEquipment();









  const items:Equipment[] = equipment.filter(

    (item)=>

      item.base_building === building &&

      item.base_room === room

  );









  return (

    <main className="
      min-h-screen
      bg-[#F7F8FA]
    ">


      <div className="
        mx-auto
        max-w-md
        px-6
        py-8
      ">






        <button

          onClick={() => router.back()}

          className="
            mb-6
            text-gray-600
          "

        >

          ← Назад


        </button>









        <h1 className="
          text-2xl
          font-bold
          text-gray-900
        ">


          {room}


        </h1>






        <p className="
          mt-2
          text-sm
          text-gray-500
        ">


          Оборудование: {items.length}


        </p>









        <div className="
          mt-6
          space-y-3
        ">









          {
            items.length === 0 && (


              <div className="
                rounded-3xl
                bg-white
                p-6
                text-center
                text-gray-500
              ">


                Оборудования пока нет


              </div>


            )

          }









          {
            items.map((item)=>(


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
                  hover:shadow-md
                "


              >








                <h2 className="
                  text-base
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



                  <UserRound size={16}/>





                  <span>


                    {
                      item.current_holder_name

                      ?

                      item.current_holder_name

                      :

                      "Свободно"

                    }


                  </span>




                </div>









                <div className="
                  mt-4
                ">


                  <StatusBadge


                    status={

                      item.status || "checking"

                    }


                  />


                </div>





              </Link>


            ))

          }






        </div>





      </div>


    </main>

  );


}