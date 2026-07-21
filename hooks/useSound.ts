"use client";


import { useRef } from "react";


const sounds = {
  pop: "/sounds/pop.wav",
  click: "/sounds/click.wav",
};


export function useSound(){


  const audioContext =
    useRef<AudioContext | null>(null);


  const buffers =
    useRef<Record<string, AudioBuffer>>({});



  async function loadSound(
    name:string
  ){

    if(
      buffers.current[name]
    ){

      return buffers.current[name];

    }


    if(!audioContext.current){

      audioContext.current =
        new AudioContext();

    }


    const response =
      await fetch(
        sounds[name as keyof typeof sounds]
      );


    const arrayBuffer =
      await response.arrayBuffer();


    const audioBuffer =
      await audioContext.current.decodeAudioData(
        arrayBuffer
      );


    buffers.current[name] =
      audioBuffer;


    return audioBuffer;

  }




  async function playSound(
    name:"pop" | "click"
  ){


    try {


      const ctx =
        audioContext.current ??
        new AudioContext();



      audioContext.current =
        ctx;



      if(
        ctx.state === "suspended"
      ){

        await ctx.resume();

      }



      const buffer =
        await loadSound(name);



      const source =
        ctx.createBufferSource();



      source.buffer =
        buffer;



      source.connect(
        ctx.destination
      );


      source.start();


    } catch(error){

      console.log(
        "Sound error",
        error
      );

    }


  }



  return {
    playSound
  };


}