"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";


type UserContextType = {

  user: string;

  userId: number | null;

  role: string;

  avatar: string;

  isLoaded: boolean;

  setUser: (
    user: string,
    id: number
  ) => Promise<void>;

  logout: () => void;

};



const UserContext =
  createContext<UserContextType | null>(null);



export function UserProvider({

  children,

}: {

  children: React.ReactNode;

}) {


  const [user, setUserState] =
    useState("");


  const [userId, setUserId] =
    useState<number | null>(null);


  const [role, setRole] =
    useState("");


  const [avatar, setAvatarState] =
    useState("");


  const [isLoaded, setIsLoaded] =
    useState(false);




  useEffect(() => {


    const savedUser =
      localStorage.getItem(
        "pulseUser"
      );


    const savedUserId =
      localStorage.getItem(
        "pulseUserId"
      );


    const savedRole =
      localStorage.getItem(
        "pulseRole"
      );


    const savedAvatar =
      localStorage.getItem(
        "pulseAvatar"
      );



    if(savedUser){

      setUserState(savedUser);

    }


    if(savedUserId){

      setUserId(
        Number(savedUserId)
      );

    }


    if(savedRole){

      setRole(savedRole);

    }


    if(savedAvatar){

      setAvatarState(savedAvatar);

    }



    setIsLoaded(true);


  }, []);






  async function setUser(

    name:string,

    id:number

  ){


    localStorage.setItem(
      "pulseUser",
      name
    );


    localStorage.setItem(
      "pulseUserId",
      String(id)
    );



    setUserState(name);

    setUserId(id);




    const {data,error}=

      await supabase

      .from("users")

      .select(
        "avatar, role"
      )

      .eq(
        "id",
        id
      )

      .single();




    if(!error && data){



      const userRole =
        data.role || "";


      const userAvatar =
        data.avatar || "";



      setRole(
        userRole
      );


      setAvatarState(
        userAvatar
      );



      localStorage.setItem(
        "pulseRole",
        userRole
      );


      localStorage.setItem(
        "pulseAvatar",
        userAvatar
      );


    }


  }





  function logout(){


    localStorage.removeItem(
      "pulseUser"
    );


    localStorage.removeItem(
      "pulseUserId"
    );


    localStorage.removeItem(
      "pulseRole"
    );


    localStorage.removeItem(
      "pulseAvatar"
    );



    setUserState("");

    setUserId(null);

    setRole("");

    setAvatarState("");


  }






  return (

    <UserContext.Provider

      value={{

        user,

        userId,

        role,

        avatar,

        isLoaded,

        setUser,

        logout,

      }}

    >

      {children}

    </UserContext.Provider>

  );


}





export function useUser(){


  const context =
    useContext(
      UserContext
    );


  if(!context){

    throw new Error(
      "useUser должен использоваться внутри UserProvider"
    );

  }


  return context;


}