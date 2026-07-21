"use client";

import {
  Wind,
  Sparkles,
  ChevronLeft,
  CircleDot,
  RotateCcw,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSound } from "@/hooks/useSound";


const messages = [
  "Сегодня ты уже сделала достаточно. Правда. 🤍",

  "Не забывай: ты тоже человек, которому нужен отдых. 🌿",

  "Ты не обязана всё контролировать. Мир не развалится. ☁️",

  "Иногда лучший план — налить чай и немного выдохнуть. 🍵",

  "Ты гораздо сильнее, чем сама о себе думаешь. 💙",

  "Кто-то сегодня улыбнулся благодаря тебе. 😊",

  "Не ругай себя за усталость. Она означает, что ты очень старалась. 🤍",

  "Сегодня можно быть неидеальной. И этого более чем достаточно. ✨",

  "Пусть сегодня случится хотя бы одна маленькая радость. 🌸",

  "Ты уже проходила сложные дни. И этот тоже пройдёт. 🌅",

  "Ты заслуживаешь заботы так же, как даришь её другим. 🫶",

  "Иногда пять минут отдыха полезнее ещё одного часа работы. 🌿",

  "Сегодняшний ты лучше вчерашнего. Этого уже достаточно. 💛",

  "Улыбнись. Это был секретный пузырёк именно для тебя. 😊",

  "Может быть, именно сейчас стоит сделать глубокий вдох. 🌬️",

  "Ты не обязана всё успеть сегодня. 🌙",

  "Спасибо, что заботишься о себе. Это очень важно. 💚",

  "Если читаешь это — значит тебе улыбнулась удача. 🍀",

  "Самое лучшее впереди. Правда. ✨",

  "Ты молодец. Даже если сегодня кажется иначе. 🤍",

  "Сегодня разрешается ничего никому не доказывать. 🌼",

  "Пусть этот пузырёк станет напоминанием: ты ценна сама по себе. 💙",

  "Иногда достаточно просто продолжать идти. ✨",

  "Ты справишься. Как и всегда. 🌸",

  "Мир становится немного лучше благодаря таким людям, как ты. 🌍",

  "Ты заслуживаешь счастливых дней. ☀️",

  "Отдохни ещё минутку. Ты никуда не опаздываешь. 🌿",

  "Ты гораздо ближе к своей мечте, чем тебе кажется. 💫",

  "Сегодня обязательно случится что-то хорошее. 🤍",

  "Спасибо, что открыла именно этот пузырёк. 🫧"
];


export default function RelaxPage() {


  const router = useRouter();

  const { playSound } = useSound();


  const [mode, setMode] =
    useState<"menu" | "bubbles" | "breathing">("menu");


  const bubbleCount = 36;


  const [popped, setPopped] =
    useState<number[]>([]);


  const [popping, setPopping] =
    useState<number | null>(null);


  const [messageBubble, setMessageBubble] =
    useState(
      Math.floor(Math.random() * bubbleCount)
    );


  const [message, setMessage] =
    useState("");





  function restartBubbles(){

    setPopped([]);

    setPopping(null);

    setMessage("");

    setMessageBubble(
      Math.floor(
        Math.random() * bubbleCount
      )
    );

}





  function popBubble(id:number){


    if(popped.includes(id)) return;



    if (id === messageBubble) {

  playSound("pop");

  setMessage(
    messages[
      Math.floor(Math.random() * messages.length)
    ]
  );

  setPopping(id);

  setTimeout(() => {

    setPopped(prev => [...prev, id]);

    setPopping(null);

  }, 200);

  return;

}



    playSound("pop");



    if(
      typeof navigator !== "undefined" &&
      navigator.vibrate
    ){

      navigator.vibrate(15);

    }



    setPopping(id);



    setTimeout(()=>{


      setPopped(prev=>[
        ...prev,
        id
      ]);


      setPopping(null);


    },200);


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

          onClick={()=>router.back()}

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
            mt-5
            rounded-3xl
            bg-white
            p-5
            shadow-sm
          ">


            <div className="
              text-center
            ">


              <h2 className="
                font-semibold
                text-gray-900
              ">

                Лопни пузырьки 🫧

              </h2>


              <p className="
                mt-1
                text-sm
                text-gray-500
              ">

                Один из них хранит послание ✨

              </p>


            </div>





            <div className="
              mt-6
              grid
              grid-cols-6
              gap-3
            ">


              {Array.from({
                length:bubbleCount
              }).map((_,index)=>(


                <button

                  key={index}

                  onClick={()=>
                    popBubble(index)
                  }


                  className={`
                    relative
                    overflow-hidden
                    aspect-square
                    rounded-full
                    border
                    transition-all
                    duration-200

                    ${
                      popping===index
                      ?
                      "bubble-pop"
                      :
                      ""
                    }


                    ${
                      popped.includes(index)

                      ?
                      "scale-90 bg-gray-100 border-gray-200"

                      :

                      "bg-gradient-to-br from-white via-sky-100 to-cyan-300 border-cyan-100 shadow-[0_6px_15px_rgba(56,189,248,0.25)]"


                    }

                  `}

                >

                  {
                    !popped.includes(index)
                    &&
                    <div
className="
absolute
left-3
top-3
h-3
w-3
rounded-full
bg-white
opacity-90
blur-[0.3px]
"/>
                  }


                </button>


              ))}



    
{message && (

<div
  className="
    mt-6
    rounded-3xl
    bg-gradient-to-br
    from-sky-50
    via-white
    to-cyan-50
    border
    border-sky-100
    p-6
    text-center
    shadow-sm
  "
>

  <p
    className="
      text-xs
      uppercase
      tracking-[0.2em]
      text-sky-500
      font-semibold
    "
  >
    ✨ Секретный пузырёк
  </p>

  <div className="my-5 text-4xl">
    💙
  </div>

  <p
    className="
      text-xl
      leading-relaxed
      font-medium
      text-gray-800
    "
  >
    {message}

        </p>

</div>

)}



            {popped.length >= bubbleCount-1 && (

              <button

                onClick={restartBubbles}

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

                <RotateCcw size={18}/>

                Повторить


              </button>


            )}



          </div>


        )}





        {mode==="menu" && (

          <div className="
            mt-5
            space-y-4
          ">


            <button

              onClick={()=>
                setMode("bubbles")
              }

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

                  Лопни шарики и получи послание 💙

                </p>

              </div>


            </button>






            <button

              onClick={()=>
                setMode("breathing")
              }

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

                  Спокойный ритм на минуту

                </p>


              </div>


            </button>


          </div>

        )}




      </div>


    </main>


  );


}