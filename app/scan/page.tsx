"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { Html5Qrcode } from "html5-qrcode";

import { useEquipment } from "@/context/EquipmentContext";


export default function ScanPage() {


  const router = useRouter();

  const { equipment } = useEquipment();


  const scannerRef = useRef<Html5Qrcode | null>(null);

  const equipmentRef = useRef(equipment);

  const scannedRef = useRef(false);

  const isRunningRef = useRef(false);



  useEffect(() => {

    equipmentRef.current = equipment;

  }, [equipment]);





  useEffect(() => {


    const scanner = new Html5Qrcode(
      "qr-reader"
    );


    scannerRef.current = scanner;



    const startScanner = async () => {


      try {


        await scanner.start(


          {
            facingMode: "environment",
          },


          {
  fps: 10,

  aspectRatio: 1.7777778,

  qrbox: {
    width: 250,
    height: 250,
  },

          },


          async (decodedText) => {


            if(scannedRef.current) return;


            scannedRef.current = true;



            const item = equipmentRef.current.find(


              (item:any) =>

                item.qr_code === decodedText ||
                item.inventory_number === decodedText


            );



            if(item){



              try {


                if(isRunningRef.current){


                  await scanner.stop();


                  isRunningRef.current = false;


                }


              } catch(error){


                console.log(
                  "Scanner stop пропущен"
                );


              }



              try {


                scanner.clear();


              } catch(error){


                console.log(
                  "Scanner clear пропущен"
                );


              }



              router.push(
                `/equipment/${item.id}`
              );



            } else {



              scannedRef.current = false;


              alert(
                "Оборудование с таким QR-кодом не найдено"
              );


            }


          },


          () => {}

        );



        isRunningRef.current = true;



      } catch(error){


        console.error(
          "Ошибка запуска камеры:",
          error
        );


        alert(
          "Не удалось открыть камеру"
        );


      }


    };



    startScanner();





    return () => {


      const scanner = scannerRef.current;


      if(!scanner) return;



      if(isRunningRef.current){


        scanner
          .stop()
          .then(() => {


            scanner.clear();


            isRunningRef.current = false;


          })
          .catch(() => {});


      }



    };


  }, [router]);





  return (

  <main className="
  relative
  h-[100dvh]
  overflow-hidden
  bg-black
">

    {/* Камера */}

    <div
  id="qr-reader"
  className="
    absolute
    inset-0
    h-full
    w-full
    overflow-hidden
  "
/>



    {/* Верхняя часть */}

    <div className="
      absolute
      top-0
      left-0
      right-0
      z-10
      px-6
      pt-12
      text-white
    ">

      <button
        onClick={() => router.back()}
        className="
          text-sm
          text-white/80
        "
      >
        ← Назад
      </button>


      <h1 className="
        mt-6
        text-3xl
        font-semibold
      ">
        Сканирование QR
      </h1>


      <p className="
        mt-2
        text-sm
        text-white/70
      ">
        Наведите камеру на QR-код оборудования
      </p>


    </div>




    {/* Рамка сканирования */}

    <div className="
      pointer-events-none
      absolute
      inset-0
      z-10
      flex
      items-center
      justify-center
    ">


      <div className="
        h-64
        w-64
        rounded-3xl
        border-2
        border-white
        shadow-[0_0_40px_rgba(255,255,255,0.3)]
      "/>


    </div>



    {/* Нижняя подсказка */}

    <div className="
      absolute
      bottom-12
      left-0
      right-0
      z-10
      flex
      justify-center
    ">


      <div className="
        rounded-full
        bg-black/50
        px-5
        py-3
        text-sm
        text-white
        backdrop-blur
      ">

        Готов к сканированию

      </div>


    </div>


  </main>

);

}