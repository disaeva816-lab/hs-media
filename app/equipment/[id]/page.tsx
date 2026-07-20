"use client";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  QRCodeCanvas,
} from "qrcode.react";

import {
  Download,
  MapPin,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  UserRound,
} from "lucide-react";


import {
  useState,
} from "react";

import { toast } from "sonner";

import {
  useEquipment,
} from "@/context/EquipmentContext";


import {
  useUser,
} from "@/context/UserContext";





function downloadQR(id:string){


  const canvas =
    document.getElementById(id) as HTMLCanvasElement | null;


  if(!canvas)
    return;


  const url =
    canvas.toDataURL("image/png");


  const link =
    document.createElement("a");


  link.href = url;


  link.download = `${id}.png`;


  link.click();


}




function StatusBadge({

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
        px-4
        py-2
        text-sm
        text-green-700
      ">

        <CheckCircle2 size={17}/>

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
        px-4
        py-2
        text-sm
        text-orange-700
      ">


        <AlertTriangle size={17}/>


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
      px-4
      py-2
      text-sm
      text-red-700
    ">


      <XCircle size={17}/>


      Неисправно


    </div>

  );


}




export default function EquipmentPage(){



  const params =
    useParams();


  const router =
    useRouter();


  const id =
    Number(params.id);




  const {

    equipment,

    updateEquipmentItem,

    returnEquipment,

  } = useEquipment();




  const {
    userId,
    role,
  } = useUser();




  const [showQR,setShowQR] =
    useState(false);



  const [showStatus,setShowStatus] =
    useState(false);




  const item =
    equipment.find(

      equipmentItem =>

        equipmentItem.id === id

    );




  if(!item){


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




  async function changeStatus(status: string) {

  await updateEquipmentItem(
    id,
    {
      status,
    }
  );

  setShowStatus(false);

  toast.success("Статус обновлён");

}


async function handleReturn() {

  await returnEquipment(id);

  toast.success("Оборудование возвращено");

}

async function handleDelete() {

  const confirmDelete =
    window.confirm(
      "Удалить это оборудование?"
    );

  if (!confirmDelete) return;


  await updateEquipmentItem(
    id,
    {
      is_deleted: true,
    }
  );


  toast.success(
    "Оборудование удалено"
  );


  router.push("/equipment");

}


  const isTaken =
  item.current_holder_id !== null;


  const canManageEquipment =
    !isTaken ||
    item.current_holder_id === userId;



  const isMyEquipment =
    item.current_holder_id === userId;

  const canChangeStatus =
    !item.current_holder_id ||
    item.current_holder_id === userId;

  const canControl =
    !isTaken || isMyEquipment;




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
            text-gray-500
          "

        >

          ← Назад


        </button>




        <div className="
          flex
          items-start
          justify-between
          gap-4
        ">


          <div>


            <h1 className="
              text-3xl
              font-semibold
              text-gray-900
            ">

              {item.name}

            </h1>



            <p className="
              mt-2
              text-gray-500
            ">

              {item.category || "Оборудование"}

            </p>


          </div>





          <button

            onClick={()=>setShowQR(true)}

            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gray-100
              text-gray-700
            "

          >

            <QrCode size={26}/>

          </button>


        </div>





        <button
            disabled={!canChangeStatus}
            onClick={()=>{
            if(canChangeStatus){
           setShowStatus(!showStatus);
          }
             }}
          className={`
         mt-5
        ${!canChangeStatus ? "cursor-not-allowed opacity-60" : ""}
           `}
         >

          <StatusBadge

            status={
              item.status || "checking"
            }

          />


        </button>




        {showStatus && canChangeStatus && (

          <div className="
            mt-4
            rounded-3xl
            bg-white
            p-4
            shadow-sm
            space-y-2
          ">


            <button

              onClick={()=>
                changeStatus("working")
              }

              className="
                w-full
                rounded-2xl
                bg-green-50
                p-3
                text-left
                text-green-700
              "

            >

              Исправно

            </button>



            <button

              onClick={()=>
                changeStatus("checking")
              }

              className="
                w-full
                rounded-2xl
                bg-orange-50
                p-3
                text-left
                text-orange-700
              "

            >

              На проверке

            </button>




            <button

              onClick={()=>
                changeStatus("broken")
              }

              className="
                w-full
                rounded-2xl
                bg-red-50
                p-3
                text-left
                text-red-700
              "

            >

              Неисправно

            </button>



          </div>

        )}





        <div className="
          mt-5
          rounded-3xl
          bg-white
          p-5
          shadow-sm
        ">


          <Info
            title="Производитель"
            value={item.brand}
          />


          <Info
            title="Модель"
            value={item.model}
          />


          <Info
            title="Инвентарный номер"
            value={item.inventory_number}
          />


        </div>






        <div className="
          mt-4
          rounded-3xl
          bg-white
          p-5
          shadow-sm
        ">


          <div className="
            flex
            items-center
            gap-3
          ">


            <MapPin size={18}/>


            <div>

              <p className="
                font-medium
                text-gray-900
              ">

                {item.current_building}

              </p>


              <p className="
                text-sm
                text-gray-500
              ">

                {item.current_room}

              </p>


            </div>


          </div>








          <div className="
            mt-5
            flex
            items-center
            gap-3
          ">


            <UserRound size={18}/>



            <span className="
              text-gray-700
            ">


              {
                item.current_holder_name
                ||
                "Свободно"
              }


            </span>


          </div>



        </div>



        {
          isMyEquipment && (

            <button

              onClick={handleReturn}

              className="
                mt-5
                w-full
                rounded-3xl
                bg-rose-100
                py-4
                font-semibold
                text-rose-700
              "

            >

              Вернуть оборудование


            </button>

          )
        }





        {
          canControl && (

            
            <Link

              href={`/equipment/${item.id}/move`}

              className="
                mt-3
                block
                rounded-3xl
                bg-gray-900
                py-4
                text-center
                font-semibold
                text-white
              "

            >

              Переместить


            </Link>

          )
        }


{
  role === "admin" && (

    <button

      onClick={handleDelete}

      className="
        mt-3
        w-full
        rounded-3xl
        bg-red-50
        py-4
        font-semibold
        text-red-700
      "

    >

      Удалить оборудование

    </button>

  )
}
        <Link

          href={`/equipment/${item.id}/history`}
          

          className="
            mt-3
            block
            rounded-3xl
            bg-white
            py-4
            text-center
            font-semibold
            text-gray-700
            shadow-sm
          "

        >

          История перемещений


        </Link>









        {showQR && (

          <div

            onClick={()=>setShowQR(false)}

            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/40
              px-6
            "

          >


            <div

              onClick={(e)=>e.stopPropagation()}

              className="
                rounded-3xl
                bg-white
                p-6
              "

            >


              <QRCodeCanvas

                id={`qr-big-${item.id}`}

                value={item.qr_code || ""}

                size={260}

              />

<p>
  {item.inventory_number}
</p>


              <button

                onClick={()=>
                  downloadQR(
                    `qr-big-${item.id}`
                  )
                }

                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-3xl
                  bg-gray-900
                  py-4
                  text-white
                "

              >

                <Download size={18}/>

                Скачать QR


              </button>



            </div>


          </div>


        )}



      </div>


    </main>


  );


}




function Info({

title,

value,

}:{

title:string;

value?:string;

}){


return (

<div className="
flex
justify-between
border-b
border-gray-100
py-3
">


<span className="
text-sm
text-gray-500
">

{title}

</span>


<span className="
text-sm
font-medium
text-gray-900
">

{value || "—"}

</span>


</div>

);


}