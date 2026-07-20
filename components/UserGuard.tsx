"use client";


import {
  useEffect,
} from "react";


import {
  usePathname,
  useRouter,
} from "next/navigation";


import {
  useUser,
} from "@/context/UserContext";









export default function UserGuard({

  children,

}: {

  children: React.ReactNode;

}) {



  const {
    user,
    isLoaded,
  } = useUser();





  const router = useRouter();


  const pathname = usePathname();








  useEffect(() => {



    if (!isLoaded) {

      return;

    }







    if (

      !user &&

      pathname !== "/users"

    ) {


      router.replace("/users");


    }






  }, [

    user,

    isLoaded,

    pathname,

    router,

  ]);









  if (!isLoaded) {


    return (

      <main className="
        min-h-screen
        bg-[#F7F8FA]
        flex
        items-center
        justify-center
      ">


        <div className="
          text-gray-500
        ">

          Загрузка...

        </div>


      </main>

    );


  }









  return children;


}