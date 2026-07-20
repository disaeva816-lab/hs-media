import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";


type Props = {

  icon: React.ReactNode;

  title: string;

  subtitle: string;

  href: string;

};





export default function MenuCard({

  icon,

  title,

  subtitle,

  href,

}: Props) {


  return (

    <Link

      href={href}

      className="
        group
        block
        w-full
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
        active:scale-[0.98]
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



          <div className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gray-100
            text-gray-600
          ">

            {icon}

          </div>







          <div className="text-left">


            <h2 className="
              text-lg
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

          size={22}

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