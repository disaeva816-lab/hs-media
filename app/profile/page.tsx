"use client";

import { useRouter } from "next/navigation";

import {
  LogOut,
  UserRound,
  Package,
  Plus,
} from "lucide-react";

import { useUser } from "@/context/UserContext";
import { useEquipment } from "@/context/EquipmentContext";

export default function ProfilePage() {

  const router = useRouter();

  const {
  user,
  userId,
  role,
  avatar,
  logout,
} = useUser();

  const {
    equipment,
  } = useEquipment();

  const myEquipmentCount =
    equipment.filter(
      (item: any) =>
        item.current_holder_id === userId
    ).length;

  function changeUser() {

    logout();

    router.push("/users");

  }
  
  function goToNewEquipment() {

  router.push("/equipment/new");

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

        <div className="
          mt-8
          rounded-3xl
          bg-white
          p-6
          shadow-sm
        ">

          <div className="
            flex
            flex-col
            items-center
          ">

            {avatar ? (

              <img

                src={`/avatars/${avatar}.png`}

                alt="Фото пользователя"

                className="
                  h-30
                  w-30
                  rounded-full
                  object-cover
                "

              />

            ) : (

              <div

                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-500
                "

              >

                <UserRound size={38}/>

              </div>

            )}

            <h2 className="
              mt-4
              text-xl
              font-semibold
              text-gray-900
            ">

              {user}

            </h2>
<div className="
  mt-2
  rounded-full
  bg-blue-50
  px-3
  py-1
  text-xs
  font-medium
  text-blue-700
">

  {role === "admin"
    ? "Администратор"
    : "Пользователь"
  }

</div>
          </div>

        </div>

        <button

  onClick={() => router.push("/my")}

  className="
    mt-4
    w-full
    rounded-3xl
    bg-white
    p-5
    shadow-sm
    text-left
  "

>

  <div className="
    flex
    items-center
    gap-3
  ">

    <Package
      size={20}
      className="text-gray-600"
    />

    <div>

      <p className="
        text-sm
        text-gray-500
      ">

        Моё оборудование

      </p>


      <p className="
        font-semibold
        text-gray-900
      ">

        {myEquipmentCount} {myEquipmentCount === 1 ? "устройство" : "устройств"}

      </p>

    </div>

  </div>


</button>

        {role === "admin" && (

  <button

    onClick={goToNewEquipment}

    className="
      mt-4
      flex
      w-full
      items-center
      gap-4
      rounded-3xl
      bg-white
      p-5
      shadow-sm
      transition
      hover:shadow-md
    "

  >

    <div

      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        bg-gray-900
        text-white
      "

    >

      <Plus size={22}/>

    </div>

    <div className="text-left">

      <p className="
        font-semibold
        text-gray-900
      ">

        Добавить оборудование

      </p>

      <p className="
        text-sm
        text-gray-500
      ">

        Только для администратора

      </p>

    </div>

  </button>

)}

        <button

          onClick={changeUser}

          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-3xl
            bg-gray-900
            py-4
            font-medium
            text-white
          "

        >

          <LogOut size={18}/>

          Сменить пользователя

        </button>

      </div>

    </main>

  );

}