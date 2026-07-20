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

    <main
      className="
        min-h-screen
        bg-black
      "
    >

      <div

        id="qr-reader"

        className="
          w-full
          h-screen
        "

      />


    </main>

  );

}