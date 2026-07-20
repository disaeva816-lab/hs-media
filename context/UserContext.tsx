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

  setAvatar: (
    avatar: string
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
  localStorage.getItem("pulseRole");

if (savedRole) {
  setRole(savedRole);
}

    const savedAvatar =
      localStorage.getItem(
        "pulseAvatar"
      );




    if (savedUser) {

      setUserState(
        savedUser
      );

    }



    if (savedUserId) {

      const id =
        Number(savedUserId);


      if (!Number.isNaN(id)) {

        setUserId(id);

      }

    }



    if (savedAvatar) {

      setAvatarState(
        savedAvatar
      );

    }



    setIsLoaded(true);


  }, []);









  async function setUser(

    name: string,

    id: number

  ) {


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




    const { data, error } =
      await supabase
        .from("users")
        .select("avatar, role")
        .eq(
          "id",
          id
        )
        .single();



    if (!error && data) {

const userRole =
  data.role || "";

setRole(userRole);

localStorage.setItem(
  "pulseRole",
  userRole
);

      const userAvatar =
        data.avatar || "";



      setAvatarState(
        userAvatar
      );



      if (userAvatar) {

        localStorage.setItem(
          "pulseAvatar",
          userAvatar
        );

      } else {

        localStorage.removeItem(
          "pulseAvatar"
        );

      }


    }


  }








  async function setAvatar(

    image: string

  ) {


    if (!userId) {

      return;

    }



    const { error } =
      await supabase
        .from("users")
        .update({

          avatar: image,

        })
        .eq(
          "id",
          userId
        );




    if (error) {

      console.error(
        "Ошибка сохранения аватара",
        error
      );

      return;

    }




    localStorage.setItem(
      "pulseAvatar",
      image
    );


    setAvatarState(
      image
    );


  }


  function logout() {


    localStorage.removeItem(
      "pulseUser"
    );


    localStorage.removeItem(
      "pulseUserId"
    );

    localStorage.removeItem(
  "pulseRole"
);

setRole("");

    localStorage.removeItem(
      "pulseAvatar"
    );



    setUserState("");

    setUserId(null);

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

        setAvatar,

        logout,

      }}

    >

      {children}

    </UserContext.Provider>

  );


}








export function useUser() {


  const context =
    useContext(
      UserContext
    );



  if (!context) {

    throw new Error(
      "useUser должен использоваться внутри UserProvider"
    );

  }



  return context;


}