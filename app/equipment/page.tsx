"use client";


import Link from "next/link";

import {
  useSearchParams,
} from "next/navigation";


import {
  MapPin,
  UserRound,
} from "lucide-react";


import {
  useEquipment,
  type Equipment,
} from "@/context/EquipmentContext";


import {
  useUser,
} from "@/context/UserContext";









function StatusBadge({

  status,

}:{

  status:string;

}){


  if(status === "working"){

    return (

      <span className="
        inline-flex
        rounded-full
        bg-green-100
        px-3
        py-1
        text-sm
        font-medium
        text-green-700
      ">

        Исправно

      </span>

    );

  }





  if(status === "checking"){

    return (

      <span className="
        inline-flex
        rounded-full
        bg-orange-100
        px-3
        py-1
        text-sm
        font-medium
        text-orange-700
      ">

        На проверке

      </span>

    );

  }







  return (

    <span className="
      inline-flex
      rounded-full
      bg-red-100
      px-3
      py-1
      text-sm
      font-medium
      text-red-700
    ">

      Неисправно

    </span>

  );


}









export default function EquipmentListPage(){



  const {
    equipment,
  } = useEquipment();





  const {
    userId,
    user,
  } = useUser();







  const searchParams =

    useSearchParams();







  const showMine =

    searchParams.get("mine") === "true";








  const filteredEquipment: Equipment[] =


    showMine


      ? equipment.filter(

          (item: Equipment) =>

            item.current_holder_id === userId

        )


      : equipment;









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


          {
            showMine

              ? "Моё оборудование"

              : "Оборудование"

          }


        </h1>








        <p className="
          mt-2
          text-sm
          text-gray-500
        ">


          {
            showMine

              ? `Сейчас у ${user}`

              : "Все устройства"

          }


        </p>









        <div className="
          mt-8
          space-y-4
        ">








          {
            filteredEquipment.map(

              (item: Equipment) => (



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
                    mt-5
                    space-y-3
                    text-sm
                  ">








                    <div className="
                      flex
                      items-center
                      gap-2
                    ">



                      <MapPin
                        size={16}
                        className="
                          text-gray-400
                        "
                      />





                      <span className="
                        text-gray-600
                      ">


                        {
                          item.current_building

                            ? (

                              item.current_room

                                ? `${item.current_building}, ${item.current_room}`

                                : item.current_building

                            )

                            :

                            "Без места"

                        }



                      </span>




                    </div>









                    <div className="
                      flex
                      items-center
                      gap-2
                    ">



                      <UserRound
                        size={16}
                        className="
                          text-gray-400
                        "
                      />





                      {

                        item.current_holder_name

                          ?

                          <span className="
                            text-gray-600
                          ">

                            {item.current_holder_name}

                          </span>


                          :


                          <span className="
                            inline-flex
                            rounded-full
                            bg-green-100
                            px-3
                            py-1
                            text-green-700
                            font-medium
                          ">

                            Свободно

                          </span>


                      }



                    </div>






                  </div>









                  <div className="
                    mt-5
                  ">


                    <StatusBadge

                      status={
                        item.status || ""
                      }

                    />


                  </div>








                </Link>



              )


            )

          }









          {
            filteredEquipment.length === 0 && (



              <div className="
                rounded-3xl
                bg-white
                p-6
                text-center
                text-gray-500
                shadow-sm
              ">



                {
                  showMine

                    ? "За вами ничего не закреплено"

                    : "Оборудования пока нет"

                }



              </div>



            )

          }







        </div>







      </div>



    </main>


  );


}