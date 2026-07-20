"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { buildings } from "@/data/buildings";

import { toast } from "sonner";

export default function NewEquipmentPage() {

  const router = useRouter();


  const categories = [
    "Камера",
    "Микрофон",
    "Колонки",
    "Микшер",
    "Аксессуары",
    "Штатив",
    "Наушники",
    "Объектив",
  ];


  const statuses = [

    {
      value: "working",
      label: "Исправно",
    },

    {
      value: "checking",
      label: "На проверке",
    },

    {
      value: "broken",
      label: "Неисправно",
    },

  ];



  const [name, setName] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [model, setModel] =
    useState("");

  const [category, setCategory] =
    useState(categories[0]);


  const [building, setBuilding] =
    useState(buildings[0].name);


  const rooms =
    useMemo(() => {

      return (
        buildings.find(
          item =>
            item.name === building
        )?.rooms || []
      );

    }, [building]);


  const [room, setRoom] =
    useState(
      buildings[0].rooms[0]
    );


  const [status, setStatus] =
    useState("working");


  const [loading, setLoading] =
    useState(false);



  function generateInventoryNumber(
    id:number
  ){

    return `EQ-${String(id).padStart(6,"0")}`;

  }



  async function saveEquipment(){


    if(!name.trim()){

      toast.error(
        "Введите название оборудования"
      );

      return;

    }



    setLoading(true);



    const { data: created, error:createError } =

      await supabase

        .from("equipment")

        .insert({

          name,

          brand,

          model,

          category,

          status,

          base_building:
            building,

          base_room:
            room,

          current_building:
            building,

          current_room:
            room,

          current_holder_id:
            null,

          taken_at:
            null,

          history:
            [],

          is_deleted:
            false,

        })

        .select("id")

        .single();



    if(createError || !created){


      setLoading(false);


      toast.error(
        "Не удалось добавить оборудование"
      );


      console.error(createError);


      return;

    }



    const inventoryNumber =
      generateInventoryNumber(
        created.id
      );



    const { error:updateError } =

      await supabase

        .from("equipment")

        .update({

          inventory_number:
            inventoryNumber,

          qr_code:
            inventoryNumber,

        })

        .eq(

          "id",

          created.id

        );




    setLoading(false);




   if (error) {

  console.log("INSERT ERROR:", error);

  toast.error(
    error.message
  );

  return;

}




    toast.success(
      "Оборудование успешно добавлено"
    );



    router.push("/equipment");


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
          text-2xl
          font-bold
          text-gray-900
        ">

          Добавить оборудование

        </h1>




        <div className="
          mt-6
          rounded-3xl
          bg-white
          p-6
          shadow-sm
          space-y-5
        ">



          <input

            value={name}

            onChange={(e)=>
              setName(e.target.value)
            }

            placeholder="Название"

            className="
              w-full
              rounded-2xl
              border
              p-3
            "

          />



          <input

            value={brand}

            onChange={(e)=>
              setBrand(e.target.value)
            }

            placeholder="Производитель"

            className="
              w-full
              rounded-2xl
              border
              p-3
            "

          />



          <input

            value={model}

            onChange={(e)=>
              setModel(e.target.value)
            }

            placeholder="Модель"

            className="
              w-full
              rounded-2xl
              border
              p-3
            "

          />



          <select

            value={category}

            onChange={(e)=>
              setCategory(e.target.value)
            }

            className="
              w-full
              rounded-2xl
              border
              p-3
            "

          >

            {categories.map(item=>(

              <option
                key={item}
                value={item}
              >

                {item}

              </option>

            ))}


          </select>




          <select

            value={building}

            onChange={(e)=>{

              setBuilding(
                e.target.value
              );


              const newBuilding =
                buildings.find(
                  item =>
                    item.name === e.target.value
                );


              if(newBuilding){

                setRoom(
                  newBuilding.rooms[0]
                );

              }


            }}

            className="
              w-full
              rounded-2xl
              border
              p-3
            "

          >


            {buildings.map(item=>(

              <option
                key={item.name}
                value={item.name}
              >

                {item.name}

              </option>

            ))}


          </select>





          <select

            value={room}

            onChange={(e)=>
              setRoom(e.target.value)
            }

            className="
              w-full
              rounded-2xl
              border
              p-3
            "

          >

            {rooms.map(item=>(

              <option
                key={item}
                value={item}
              >

                {item}

              </option>

            ))}


          </select>





          <select

            value={status}

            onChange={(e)=>
              setStatus(e.target.value)
            }

            className="
              w-full
              rounded-2xl
              border
              p-3
            "

          >


            {statuses.map(item=>(

              <option
                key={item.value}
                value={item.value}
              >

                {item.label}

              </option>

            ))}


          </select>






          <button

            onClick={saveEquipment}

            disabled={loading}

            className="
              w-full
              rounded-3xl
              bg-gray-900
              py-4
              font-medium
              text-white
              disabled:opacity-50
            "

          >

            {

              loading

              ? "Сохранение..."

              : "Сохранить оборудование"

            }


          </button>



        </div>


      </div>


    </main>

  );

}