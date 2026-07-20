"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  UserRound,
} from "lucide-react";

import { useUser } from "@/context/UserContext";



const users = [

  {
    id: 1,
    name: "Диана",
    color: "bg-gray-100 text-gray-700",
  },

  {
    id: 4,
    name: "Катя",
    color: "bg-gray-100 text-gray-700",
  },

  {
    id: 6,
    name: "Яна",
    color: "bg-gray-100 text-gray-700",
  },

  {
    id: 3,
    name: "Арсений",
    color: "bg-gray-100 text-gray-700",
  },

  {
    id: 5,
    name: "Администратор",
    color: "bg-gray-900 text-white",
  },

];





export default function UsersPage() {


  const {
    setUser
  } = useUser();



  const router = useRouter();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

const [adminPassword, setAdminPassword] = useState("");

const ADMIN_PASSWORD = "admin";





  function chooseUser(

  name:string,

  id:number

) {

  if (id === 5) {

    setShowAdminLogin(true);

    return;

  }


  setUser(
    name,
    id
  );


  router.push("/");

}





  return (

    <main className="min-h-screen bg-[#F7F8FA]">


      <div className="
        mx-auto
        flex
        min-h-screen
        max-w-md
        flex-col
        px-3
        pt-4
        pb-24
      ">



        <h1 className="
          text-center
          text-4xl
          font-bold
          text-gray-900
        ">

          Pulse

        </h1>




        <p className="
          mt-6
          text-center
          text-gray-500
        ">

          Кто сегодня работает?

        </p>





        <div className="mt-10 space-y-3">



          {users.map((user)=>(



            <button


              key={user.id}


              onClick={() =>
                chooseUser(
                  user.name,
                  user.id
                )
              }



              className="
                flex
                w-full
                items-center
                gap-4
                rounded-3xl
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
              "



            >



              <div className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                ${user.color}
              `}>



                <UserRound size={28}/>



              </div>





              <span className="
                text-xl
                font-semibold
                text-gray-900
              ">


                {user.name}


              </span>




            </button>



          ))}



        </div>



      </div>

{showAdminLogin && (

  <div className="
    fixed
    inset-0
    flex
    items-center
    justify-center
    bg-black/40
    px-6
  ">

    <div className="
      w-full
      max-w-sm
      rounded-3xl
      bg-white
      p-6
    ">

      <h2 className="
        text-xl
        font-bold
        text-gray-900
      ">

        Вход администратора

      </h2>


      <input

        type="password"

        value={adminPassword}

        onChange={(e)=>
          setAdminPassword(e.target.value)
        }

        placeholder="Введите пароль"

        className="
          mt-5
          w-full
          rounded-2xl
          border
          p-3
        "

      />


      <button

        onClick={() => {

          if (
            adminPassword === ADMIN_PASSWORD
          ) {

            setUser(
              "Администратор",
              5
            );

            router.push("/");

          } else {

            alert(
              "Неверный пароль"
            );

          }

        }}

        className="
          mt-4
          w-full
          rounded-2xl
          bg-gray-900
          py-3
          text-white
        "

      >

        Войти

      </button>


      <button

        onClick={() => {

          setShowAdminLogin(false);

          setAdminPassword("");

        }}

        className="
          mt-3
          w-full
          rounded-2xl
          bg-gray-100
          py-3
          text-gray-700
        "

      >

        Назад

      </button>


    </div>

  </div>

)}
    </main>


  );

}