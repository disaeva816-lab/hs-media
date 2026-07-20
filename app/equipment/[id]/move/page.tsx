"use client";

import {
  useState,
} from "react";


import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  buildings,
} from "@/data/buildings";


import {
  useEquipment,
  type EquipmentHistory,
} from "@/context/EquipmentContext";


import {
  useUser,
} from "@/context/UserContext";


import {
  toast,
} from "sonner";





export default function MovePage() {


  const params = useParams();

  const router = useRouter();


  const id = Number(params.id);





  const {
    equipment,
    updateEquipmentItem,
  } = useEquipment();





  const {
    user,
    userId,
  } = useUser();





  const [
    selectedBuilding,
    setSelectedBuilding,
  ] = useState("");





  const [
    selectedRoom,
    setSelectedRoom,
  ] = useState("");






  const item = equipment.find(
    equipmentItem =>
      equipmentItem.id === id
  );






  if (!item) {

    return (

      <main className="
        min-h-screen
        bg-[#F7F8FA]
        p-6
      ">

        Оборудование не найдено

      </main>

    );

  }






  const isTakenByAnotherUser =

    item.current_holder_id !== null &&

    item.current_holder_id !== userId;






  if (isTakenByAnotherUser) {


    return (

      <main className="
        min-h-screen
        bg-[#F7F8FA]
        p-6
      ">


        <div className="
          mx-auto
          max-w-md
          rounded-3xl
          bg-white
          p-6
          shadow-sm
        ">


          <h1 className="
            text-xl
            font-semibold
            text-gray-900
          ">

            Оборудование недоступно

          </h1>




          <p className="
            mt-3
            text-gray-500
          ">

            Сейчас оборудование находится у:

          </p>




          <p className="
            mt-2
            font-semibold
            text-gray-900
          ">

            {item.current_holder_name}

          </p>




          <button

            onClick={() => router.back()}

            className="
              mt-6
              w-full
              rounded-3xl
              bg-gray-900
              py-4
              font-semibold
              text-white
            "

          >

            Назад

          </button>


        </div>


      </main>

    );

  }







  const currentBuilding = buildings.find(

    building =>

      building.name === selectedBuilding

  );







  async function moveEquipment() {


    if (!item) {
      return;
    }


    if (
      !selectedBuilding ||
      !selectedRoom
    ) {

      return;

    }






    const newHistory: EquipmentHistory[] = [

      ...(item.history ?? []),

      {

        from:

          `${item.current_building || ""}, ${item.current_room || ""}`,



        to:

          `${selectedBuilding}, ${selectedRoom}`,



        user:

          user || "Неизвестный пользователь",



        date:

          new Date().toLocaleString(
            "ru-RU"
          ),

      },

    ];







    await updateEquipmentItem(

      id,

      {

        current_building:
          selectedBuilding,


        current_room:
          selectedRoom,


        current_holder_id:
          userId,


        taken_at:
          new Date().toISOString(),


        history:
          newHistory,

      }

    );




    toast.success(
      "Оборудование успешно перемещено"
    );



    router.push(
      `/equipment/${id}`
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
        py-10
      ">


        <h1 className="
          text-3xl
          font-semibold
          text-gray-900
        ">

          Переместить

        </h1>





        <p className="
          mt-3
          text-gray-500
        ">

          {item.name}

        </p>







        {!selectedBuilding && (

          <div className="
            mt-8
            space-y-4
          ">


            {buildings.map(

              building => (

                <button

                  key={building.name}

                  onClick={() =>
                    setSelectedBuilding(
                      building.name
                    )
                  }

                  className="
                    w-full
                    rounded-3xl
                    bg-white
                    p-5
                    text-left
                    shadow-sm
                  "

                >

                  {building.name}

                </button>

              )

            )}


          </div>

        )}









        {
          selectedBuilding &&
          !selectedRoom && (

            <div className="mt-8">


              <button

                onClick={() =>
                  setSelectedBuilding("")
                }

                className="
                  text-gray-500
                "

              >

                ← Назад

              </button>




              <h2 className="
                mt-5
                text-xl
                font-semibold
              ">

                {selectedBuilding}

              </h2>




              <div className="
                mt-5
                space-y-3
              ">


                {
                  currentBuilding?.rooms.map(

                    room => (

                      <button

                        key={room}

                        onClick={() =>
                          setSelectedRoom(room)
                        }

                        className="
                          w-full
                          rounded-3xl
                          bg-white
                          p-5
                          text-left
                          shadow-sm
                        "

                      >

                        {room}

                      </button>

                    )

                  )

                }


              </div>


            </div>

          )

        }









        {
          selectedRoom && (

            <div className="
              mt-8
              rounded-3xl
              bg-white
              p-6
              shadow-sm
            ">


              <p className="
                text-sm
                text-gray-500
              ">

                Переместить в:

              </p>




              <p className="
                mt-3
                font-semibold
              ">

                {selectedBuilding}

                <br />

                {selectedRoom}

              </p>





              <button

                onClick={moveEquipment}

                className="
                  mt-5
                  w-full
                  rounded-3xl
                  bg-gray-900
                  py-4
                  font-semibold
                  text-white
                "

              >

                Переместить

              </button>



            </div>

          )

        }


      </div>


    </main>

  );


}