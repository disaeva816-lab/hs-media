"use client";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  Drama,
  Mic2,
  Video,
  Dumbbell,
  Waves,
  BookOpen,
  Music,
  Warehouse,
  Monitor,
  Building2,
} from "lucide-react";


import {
  buildings,
} from "@/data/buildings";


import {
  useEquipment,
} from "@/context/EquipmentContext";








function getRoomIcon(room:string) {


  if(room.includes("Склад"))

    return <Warehouse size={22}/>;



  if(room.includes("Театраль"))

    return <Drama size={22}/>;



  if(room.includes("Звук"))

    return <Mic2 size={22}/>;



  if(room.includes("Видео"))

    return <Video size={22}/>;



  if(room.includes("Спортив"))

    return <Dumbbell size={22}/>;



  if(room.includes("Бассейн"))

    return <Waves size={22}/>;



  if(room.includes("Библиот"))

    return <BookOpen size={22}/>;



  if(room.includes("Оркестр"))

    return <Music size={22}/>;



  if(room.includes("Студи"))

    return <Monitor size={22}/>;



  return <Building2 size={22}/>;

}









export default function BuildingPage(){



  const params = useParams();


  const router = useRouter();




  const buildingName = decodeURIComponent(

    String(params.building || "")

  );







  const {

    equipment,

  } = useEquipment();









  const building = buildings.find(


    (item) =>

      item.name === buildingName


  );








  if(!building){


    return (

      <main className="
        min-h-screen
        bg-[#F7F8FA]
        p-6
      ">


        <h1 className="
          text-xl
          font-bold
          text-gray-900
        ">


          Здание не найдено


        </h1>




        <p className="
          mt-2
          text-gray-500
        ">


          {buildingName}


        </p>



      </main>

    );


  }









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
          text-xl
          font-bold
          text-gray-900
        ">


          {building.name}


        </h1>








        <p className="
          mt-2
          text-sm
          text-gray-500
        ">


          Выберите помещение


        </p>









        <div className="
          mt-6
          space-y-3
        ">








          {
            building.rooms.map((room)=>(



              <Link


                key={room}


                href={

                  `/locations/${encodeURIComponent(building.name)}/${encodeURIComponent(room)}`

                }



                className="
                  flex
                  items-center
                  justify-between
                  rounded-3xl
                  bg-white
                  p-4
                  shadow-sm
                  transition
                  hover:shadow-md
                "


              >








                <div className="
                  flex
                  items-center
                  gap-4
                ">







                  <div className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gray-100
                    text-gray-600
                  ">


                    {getRoomIcon(room)}


                  </div>









                  <div>


                    <h2 className="
                      text-base
                      font-semibold
                      text-gray-900
                    ">


                      {room}


                    </h2>







                    <p className="
                      mt-1
                      text-sm
                      text-gray-500
                    ">


                      {
                        equipment.filter(

                          (item:any) =>

                            item.base_building === building.name &&

                            item.base_room === room

                        ).length

                      }

                      {" "}единиц оборудования


                    </p>




                  </div>





                </div>





              </Link>


            ))

          }







        </div>






      </div>



    </main>

  );


}