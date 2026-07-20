"use client";


import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


import { supabase } from "@/lib/supabase";





export type EquipmentHistory = {

  from: string;

  to: string;

  user: string;

  date: string;

};






export type Equipment = {


  id:number;


  name:string;


  brand?:string;

  model?:string;

  category?:string;



  inventory_number?:string;

  qr_code?:string;



  status?:string;



  // постоянное место

base_building?: string;

base_room?: string;



// текущее место

current_building?: string;

current_room?: string;



  // кто взял

  current_holder_id?:number | null;

  current_holder_name?:string | null;



  taken_at?:string | null;



  history:EquipmentHistory[];



  is_deleted:boolean;



  created_at?:string;


};









type EquipmentContextType = {


  equipment:Equipment[];


  updateEquipmentItem:

  (

    id:number,

    data:Partial<Equipment>

  )=>Promise<void>;



  returnEquipment:

  (

    id:number

  )=>Promise<void>;



  refreshEquipment:

  ()=>Promise<void>;


};









const EquipmentContext =

createContext<EquipmentContextType | null>(null);









export function EquipmentProvider({

children,

}:{

children:React.ReactNode;

}) {



const [

equipment,

setEquipment

]=useState<Equipment[]>([]);









async function refreshEquipment(){



const {

data:equipmentData,

error:equipmentError,

}=await supabase

.from("equipment")

.select("*")

.eq(

"is_deleted",

false

)

.order(

"id",

{

ascending:true

}

);





if(equipmentError){

console.error(

equipmentError

);

return;

}









const {

data:usersData,

error:usersError,

}=await supabase

.from("users")

.select(

"id,name"

);





if(usersError){

console.error(

usersError

);

return;

}









const usersMap =

new Map<number,string>();





(usersData || [])

.forEach(

(user:any)=>{


usersMap.set(

user.id,

user.name

);


}

);









const prepared =

(equipmentData || [])

.map(

(item:any)=>(


{

...item,


history:

item.history || [],



current_holder_name:

item.current_holder_id != null
  ? usersMap.get(item.current_holder_id) || null
  : null,


}


)

);







setEquipment(

prepared

);



}









useEffect(()=>{


refreshEquipment();


},[]);













async function updateEquipmentItem(

id:number,

data:Partial<Equipment>

){



const {

error

}=await supabase

.from("equipment")

.update(data)

.eq(

"id",

id

);





if(error){

console.error(
  "ОШИБКА SUPABASE UPDATE:",
  error.message,
  error.details,
  error.hint,
  error.code
);

return;

}





await refreshEquipment();


}












async function returnEquipment(
  id:number
){

  const item =
    equipment.find(
      item => item.id === id
    );


  if(!item)
    return;



 await updateEquipmentItem(
id,
{
current_building:item.base_building,

current_room:item.base_room,

current_holder_id:null,

taken_at:null,
}
);



}



return (

<EquipmentContext.Provider

value={{

equipment,

updateEquipmentItem,

returnEquipment,

refreshEquipment,

}}

>


{children}


</EquipmentContext.Provider>

);


}









export function useEquipment(){


const context=

useContext(

EquipmentContext

);



if(!context){

throw new Error(

"useEquipment должен использоваться внутри EquipmentProvider"

);

}



return context;


}