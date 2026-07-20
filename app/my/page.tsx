"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

import { useUser } from "@/context/UserContext";
import { useEquipment } from "@/context/EquipmentContext";



export default function MyEquipmentPage() {


  const {
    userId,
  } = useUser();



  const {
    equipment,
  } = useEquipment();





  const myEquipment = equipment.filter(

    (item:any) =>

      item.current_holder_id === userId

  );







  return (

    <main className="min-h-screen bg-[#F7F8FA]">


      <div className="mx-auto max-w-md px-6 py-10">



        <h1 className="text-3xl font-bold text-gray-900">

          Моё оборудование

        </h1>




        <p className="mt-2 text-gray-500">

          Сейчас за вами: {myEquipment.length}

        </p>







        <div className="mt-8 space-y-4">



          {myEquipment.length === 0 ? (



            <div className="
              rounded-3xl
              bg-white
              p-6
              text-gray-500
              shadow-sm
            ">

              Оборудования пока нет

            </div>



          ) : (



            myEquipment.map((item:any)=>(



              <div

                key={item.id}

                className="
                  rounded-3xl
                  bg-white
                  p-6
                  shadow-sm
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
                  text-gray-600
                ">


                  <MapPin size={16}/>


                 <span>

  {item.current_building || "—"},
  {" "}
  {item.current_room || "—"}

</span>


                </div>








                <Link

                  href={`/equipment/${item.id}`}

                  className="
                    mt-5
                    block
                    rounded-2xl
                    bg-gray-900
                    py-3
                    text-center
                    font-semibold
                    text-white
                  "

                >

                  Открыть карточку


                </Link>




              </div>


            ))


          )}



        </div>



      </div>


    </main>


  );


}