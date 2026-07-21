"use client";

import {
  Wind,
  Sparkles,
  ChevronLeft,
  CircleDot,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSound } from "@/hooks/useSound";


export default function RelaxPage() {

  const router = useRouter();
  const { playSound } = useSound();

const [mode, setMode] = useState<"menu" | "bubbles" | "breathing">("menu");


const [bubbles, setBubbles] = useState(
  [
    { id: 1, x: 20, y: 30, size: 70 },
    { id: 2, x: 60, y: 20, size: 90 },
    { id: 3, x: 40, y: 65, size: 60 },
    { id: 4, x: 75, y: 55, size: 80 },
  ]
);


function popBubble(id:number){
      playSound("pop");

  setBubbles(prev =>
    prev.filter(
      bubble => bubble.id !== id
    )
  );


  setTimeout(() => {

    setBubbles(prev => [

      ...prev,

      {
        id: Date.now(),
        x: Math.random()*70 + 10,
        y: Math.random()*70 + 10,
        size: Math.random()*40 + 50,
      }

    ]);

  },500);

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
        pt-6
        pb-24
      ">


        <button

          onClick={() => router.back()}

          className="
            mb-6
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
          "

        >

          <ChevronLeft size={18}/>

          Назад

        </button>



        <div className="
          rounded-3xl
          bg-white
          p-6
          shadow-sm
        ">


          <div className="
            flex
            items-center
            gap-3
          ">


            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
              text-blue-700
            ">

              <Sparkles size={24}/>

            </div>


            <div>


              <h1 className="
                text-2xl
                font-semibold
                text-gray-900
              ">

                Перезагрузка

              </h1>


              <p className="
                text-sm
                text-gray-500
              ">

                Минутка спокойствия

              </p>


            </div>


          </div>



        </div>


{mode === "bubbles" && (

<div className="
relative
mt-5
h-[420px]
overflow-hidden
rounded-3xl
bg-white
shadow-sm
">


<div className="
absolute
top-5
left-0
right-0
text-center
">

<h2 className="
font-semibold
text-gray-900
">

Лопайте пузырьки 🫧

</h2>


<p className="
mt-1
text-sm
text-gray-500
">

Снимите напряжение

</p>

</div>


{bubbles.map((bubble)=> (

<button

key={bubble.id}

onClick={() => popBubble(bubble.id)}

className="
bubble
absolute
rounded-full
transition
active:scale-75
bg-gradient-to-br
from-blue-100
to-purple-200
shadow-lg
border
border-white/70
"


style={{

left:`${bubble.x}%`,

top:`${bubble.y}%`,

width:bubble.size,

height:bubble.size,

}}

>


<div className="
absolute
top-3
left-4
h-3
w-3
rounded-full
bg-white
opacity-70
pointer-events-none
"/>

</button>
))}

</div>

)}
{mode === "menu" && (
        <div className="
          mt-5
          space-y-4
        ">



          <button
onClick={() => setMode("bubbles")}
            className="
              flex
              w-full
              items-center
              gap-4
              rounded-3xl
              bg-white
              p-5
              text-left
              shadow-sm
            "

          >


            <div className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
              text-blue-700
            ">

              <CircleDot size={28}/>

            </div>


            <div>


              <h2 className="
                font-semibold
                text-gray-900
              ">

                Пузырьки
                

              </h2>


              <p className="
                mt-1
                text-sm
                text-gray-500
              ">

                Лопайте пузырьки и расслабляйтесь

              </p>


            </div>


          </button>





          <button
          onClick={() => setMode("breathing")}

            className="
              flex
              w-full
              items-center
              gap-4
              rounded-3xl
              bg-white
              p-5
              text-left
              shadow-sm
            "

          >


            <div className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-green-50
              text-green-700
            ">

              <Wind size={28}/>

            </div>


            <div>


              <h2 className="
                font-semibold
                text-gray-900
              ">

                Дыхание

              </h2>


              <p className="
                mt-1
                text-sm
                text-gray-500
              ">

                Спокойный ритм на 1 минуту

              </p>


            </div>


          </button>



        </div>
        )}



      </div>


    </main>

  );

}