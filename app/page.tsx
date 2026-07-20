"use client";

import Link from "next/link";

import {
  Search,
  QrCode,
  Backpack,
  Building2,
  ChevronRight,
  UserRound,
  Package,
  Sparkles,
} from "lucide-react";


import { useUser } from "@/context/UserContext";
import { useEquipment } from "@/context/EquipmentContext";



export default function Home() {


  const {
    user,
    userId,
    avatar,
  } = useUser();



  const {
    equipment,
  } = useEquipment();





  const myEquipmentCount =

  equipment.filter(

    (item:any) =>

      item.current_holder_id === userId

  ).length;


const freeEquipmentCount =

equipment.filter(

(item:any) =>

!item.current_holder_id

).length;




  return (


    <main className="min-h-screen bg-[#F7F8FA]">



      <div className="mx-auto max-w-md px-5 pt-4 pb-24">







        {/* Приветствие */}



        <div className="
  rounded-3xl
  bg-white
  p-4
  shadow-sm
">


<div className="
  flex
  items-center
  justify-between
">


<div>

<p className="
text-sm
text-gray-500
">

Добро пожаловать,

</p>


<h1 className="
mt-2
text-3xl
font-semibold
text-gray-900
">

{user}

</h1>


<div className="
mt-3
flex
items-center
gap-2
text-sm
text-blue-700
">

<Sparkles size={14}/>

Система управления оборудованием

</div>


</div>



{avatar ? (

<img

src={avatar}

alt="Аватар"

className="
h-18
w-18
rounded-full
object-cover
"

/>

) : (

<div className="
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-blue-50
text-blue-800
">

<UserRound size={26}/>

</div>

)}


</div>


<div className="
mt-5
grid
grid-cols-3
gap-2
">


<MiniStat

icon={<Package size={20}/>}

value={equipment.length}

title="Всего"

/>


<MiniStat

icon={<Backpack size={20}/>}

value={myEquipmentCount}

title="Моё"

/>



<MiniStat

icon={<Building2 size={20}/>}

value={freeEquipmentCount}

title="Свободно"

/>



</div>
</div>



        {/* Главное меню */}


        <div className="mt-5 space-y-2">





          <MenuCard


            href="/search"


            icon={<Search size={26}/>}


            title="Поиск оборудования"


            subtitle="Найти колонку, микрофон или камеру"


          />









          <MenuCard


            href="/scan"


            icon={<QrCode size={26}/>}


            title="Сканировать QR"


            subtitle="Быстро найти оборудование"


          />


          <MenuCard


            href="/equipment?mine=true"


            icon={<Backpack size={26}/>}


            title="Моё оборудование"


            subtitle={
              `${myEquipmentCount} прибора закреплено за вами`
            }


          />



          <MenuCard


            href="/locations"


            icon={<Building2 size={26}/>}


            title="Помещения"


            subtitle="Посмотреть оборудование по зданиям"


          />






        </div>





      </div>



    </main>


  );


}

function MiniStat({

icon,

value,

title,

}:{

icon:React.ReactNode;

value:number;

title:string;

}){


return (

<div className="
rounded-3xl
bg-white
p-4
shadow-sm
">


<div className="
text-blue-700
">

{icon}

</div>


<p className="
mt-2
text-xl
font-bold
text-gray-900
">

{value}

</p>


<p className="
text-xs
text-gray-500
">

{title}

</p>


</div>

);

}

function MenuCard({

  href,

  icon,

  title,

  subtitle,

}: {


  href:string;


  icon:React.ReactNode;


  title:string;


  subtitle:string;


}) {



  return (



    <Link


      href={href}


      className="
        group
        block
        rounded-3xl
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
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






          <div

            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gray-100
              text-blue-800
            "

          >

            {icon}

          </div>



          <div>



            <h2 className="
              font-semibold
              text-gray-900
            ">


              {title}


            </h2>


            <p className="
              mt-1
              text-sm
              text-gray-500
            ">


              {subtitle}


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


}