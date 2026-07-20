"use client";

import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  MapPin,
  UserRound,
  CalendarDays,
} from "lucide-react";


import {
  useEquipment,
} from "@/context/EquipmentContext";


export default function HistoryPage() {


  const params = useParams();

  const router = useRouter();


  const id = Number(params.id);



  const {
    equipment,
  } = useEquipment();



  const item = equipment.find(

    (item:any) =>

      item.id === id

  );



  if(!item){


    return (

      <main className="
        min-h-screen
        bg-[#F7F8FA]
        p-6
      ">


        <h1 className="
          text-2xl
          font-bold
          text-gray-900
        ">

          Оборудование не найдено

        </h1>


      </main>

    );

  }

  const history = item.history || [];

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
          text-3xl
          font-semibold
          text-gray-900
        ">

          История

        </h1>

        <p className="
          mt-3
          text-gray-500
        ">

          {item.name}

        </p>

        <div className="
          mt-8
          space-y-4
        ">

          {
            history.length === 0 ? (


              <div className="
                rounded-3xl
                bg-white
                p-6
                text-center
                text-gray-500
                shadow-sm
              ">

                Перемещений пока не было


              </div>


            ) : (


              history.map(
                (move:any,index:number)=>(



                  <div

                    key={index}

                    className="
                      rounded-3xl
                      bg-white
                      p-6
                      shadow-sm
                    "

                  >

                    <div className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-gray-400
                    ">


                      <CalendarDays size={16}/>


                      {move.date}


                    </div>


                    <div className="
                      mt-4
                      flex
                      items-center
                      gap-2
                      text-gray-700
                    ">


                      <UserRound size={17}/>


                      {move.user || "—"}


                    </div>


                    <div className="
                      mt-5
                      space-y-3
                    ">


                      <div className="
                        flex
                        items-start
                        gap-3
                      ">


                        <MapPin
                          size={18}
                          className="mt-0.5 text-gray-500"
                        />


                        <div>


                          <p className="
                            text-xs
                            text-gray-400
                          ">

                            Откуда

                          </p>


                          <p className="
                            text-gray-900
                          ">

                            {move.from || "—"}

                          </p>


                        </div>


                      </div>



                      <div className="
                        flex
                        items-start
                        gap-3
                      ">


                        <MapPin
                          size={18}
                          className="mt-0.5 text-gray-500"
                        />


                        <div>


                          <p className="
                            text-xs
                            text-gray-400
                          ">

                            Куда

                          </p>


                          <p className="
                            text-gray-900
                          ">

                            {move.to || "—"}

                          </p>


                        </div>


                      </div>


                    </div>


                  </div>

                )

              )

            )

          }

        </div>

      </div>

    </main>

  );

}