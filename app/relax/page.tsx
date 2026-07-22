"use client";

import {
  Wind,
  Sparkles,
  ChevronLeft,
  CircleDot,
  RotateCcw,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSound } from "@/hooks/useSound";

const BUBBLE_COUNT = 36;

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

type Mode =
  | "menu"
  | "bubbles"
  | "breathing";

export default function RelaxPage() {

  const router = useRouter();

  const { playSound } = useSound();

  const [mode, setMode] =
    useState<Mode>("menu");

  const [secretBubble, setSecretBubble] =
    useState(() =>
      Math.floor(
        Math.random() * BUBBLE_COUNT
      )
    );

  const [popped, setPopped] =
    useState<number[]>([]);

  const [popping, setPopping] =
    useState<number | null>(null);

  const [showMessage, setShowMessage] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [phase, setPhase] =
    useState<
      "inhale" |
      "hold" |
      "exhale"
    >("inhale");

  useEffect(() => {

    if (mode !== "breathing") return;

    let timer: NodeJS.Timeout;

    switch (phase) {

      case "inhale":

        timer = setTimeout(() => {

          setPhase("hold");

        }, 4000);

        break;

      case "hold":

        timer = setTimeout(() => {

          setPhase("exhale");

        }, 2000);

        break;

      case "exhale":

        timer = setTimeout(() => {

          setPhase("inhale");

        }, 4000);

        break;

    }

    return () => clearTimeout(timer);

  }, [phase, mode]);

  function restartBubbles() {

    setPopped([]);

    setPopping(null);

    setShowMessage(false);

    setMessage("");

    setSecretBubble(

      Math.floor(
        Math.random() *
        BUBBLE_COUNT
      )

    );

  }

  function popBubble(index:number){

    if(
      popped.includes(index)
    ) return;

    playSound("pop");

    if(
      typeof navigator !== "undefined" &&
      navigator.vibrate
    ){

      navigator.vibrate(15);

    }

    setPopping(index);

    setTimeout(()=>{

      if(index === secretBubble){

        setMessage(

          messages[
            Math.floor(
              Math.random() *
              messages.length
            )
          ]

        );

        setShowMessage(true);

        setPopped(

          Array.from(
            {
              length:BUBBLE_COUNT
            },
            (_,i)=>i
          )

        );

      }else{

        setPopped(prev=>[
          ...prev,
          index
        ]);

      }

      setPopping(null);

    },180);

  }

  const breathingText =

    phase === "inhale"

      ? "Вдох"

      : phase === "hold"

      ? "Задержите дыхание"

      : "Выдох";

  const breathingScale =

    phase === "inhale"

      ? "scale-125"

      : phase === "hold"

      ? "scale-125"

      : "scale-90";

  return (

    <main className="min-h-screen bg-[#F7F8FA]">

      <div className="mx-auto max-w-md px-6 pt-6 pb-24">

        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500"
        >

          <ChevronLeft size={18}/>

          Назад

        </button>

        <div className="rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">

              <Sparkles size={24}/>

            </div>

            <div>

              <h1 className="text-2xl font-semibold text-gray-900">

                Перезагрузка

              </h1>

              <p className="text-sm text-gray-500">

                Минутка спокойствия

              </p>

            </div>

          </div>

        </div>
                {mode === "bubbles" && (

          <div className="mt-5 rounded-3xl bg-white p-5 shadow-sm">

            <div className="text-center">

              <h2 className="font-semibold text-gray-900">
                Лопни пузырьки 🫧
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Один из пузырьков хранит сюрприз ✨
              </p>

            </div>

            <div className="mt-6 grid grid-cols-6 gap-3">

              {Array.from({
                length: BUBBLE_COUNT
              }).map((_, index) => (

                <button

                  key={index}

                  onClick={() => popBubble(index)}

                  className={`
relative
overflow-hidden
aspect-square
rounded-full
transition-all
duration-200
border

${popping === index ? "bubble-pop" : ""}

${
popped.includes(index)

?

"scale-90 bg-slate-200 border-slate-300"

:

"border-sky-200 bg-gradient-to-br from-white via-sky-200 to-blue-900 shadow-[0_10px_25px_rgba(59,130,246,.45)] active:scale-75"

}
                  `}
                >

                  {!popped.includes(index) && (

                    <>
                      <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-white/95" />

                      <div className="absolute right-4 top-5 h-1.5 w-1.5 rounded-full bg-white/80" />
                    </>

                  )}

                </button>

              ))}

            </div>

            {showMessage && (

  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-md
      px-6
      animate-in
      fade-in
      duration-500
    "
  >

    <div
      className="
        w-full
        max-w-sm
        rounded-[36px]
        bg-white/80
        backdrop-blur-xl
        border
        border-white/70
        p-8
        text-center
        shadow-[0_20px_70px_rgba(0,0,0,0.18)]
        animate-in
        zoom-in-95
        slide-in-from-bottom-5
        duration-500
      "
    >

      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-sky-100
          text-3xl
        "
      >
        🫧
      </div>


      <p
        className="
          mt-5
          text-xs
          uppercase
          tracking-[0.35em]
          text-sky-500
        "
      >
        Послание
      </p>


      <p
        className="
          mt-6
          text-xl
          font-medium
          leading-relaxed
          text-gray-800
        "
      >
        {message}
      </p>


      <button

        onClick={restartBubbles}

        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-sky-400
          py-4
          font-semibold
          text-white
          shadow-lg
          shadow-sky-200
          transition
          active:scale-95
        "

      >

        <RotateCcw size={18}/>

        Начать заново

      </button>


    </div>
    

  </div>
            

)}
</div>
)}

{mode === "breathing" && (

          <div className="mt-5 rounded-3xl bg-white p-10 shadow-sm">

            <div className="flex flex-col items-center">

              <div
                className={`
h-52
w-52
rounded-full
bg-gradient-to-br
from-sky-500
to-blue-900
shadow-[0_20px_60px_rgba(59,130,246,.45)]
transition-all
duration-[4000ms]
${breathingScale}
`}
              />

              <p className="mt-10 text-3xl font-semibold text-gray-900">

                {breathingText}

              </p>

              <p className="mt-3 text-center text-gray-500">

                Вдох — 4 сек<br/>
                Задержка — 2 сек<br/>
                Выдох — 4 сек

              </p>

            </div>

          </div>
          

        )}
        

        {mode === "menu" && (

          <div className="mt-5 space-y-4">

            <button

              onClick={() => setMode("bubbles")}

              className="flex w-full items-center gap-4 rounded-3xl bg-white p-5 text-left shadow-sm"

            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">

                <CircleDot size={28}/>

              </div>

              <div>

                <h2 className="font-semibold text-gray-900">

                  Пузырьки

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                  Лопни шарики и найди секретное послание 💙

                </p>

              </div>

            </button>

            <button

              onClick={() => setMode("breathing")}

              className="flex w-full items-center gap-4 rounded-3xl bg-white p-5 text-left shadow-sm"

            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">

                <Wind size={28}/>

              </div>

              <div>

                <h2 className="font-semibold text-gray-900">

                  Дыхание

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                  Минутная практика расслабления

                </p>

              </div>

            </button>

          </div>

        )}

      </div>

    </main>

  );

}