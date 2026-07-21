"use client";

const sounds: Record<string, HTMLAudioElement> = {
  click: new Audio("/sounds/click.wav"),
  success: new Audio("/sounds/success.mp3"),
};


sounds.click.preload = "auto";
sounds.success.preload = "auto";


export function useSound() {


  function playSound(
    name: "click" | "success"
  ) {


    const audio = sounds[name];


    if (!audio) return;


    audio.currentTime = 0;

    audio.volume = 0.2;


    audio.play().catch((error) => {
      console.log("Sound error:", error);
    });


  }


  return {
    playSound,
  };

}