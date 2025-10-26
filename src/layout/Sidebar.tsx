import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import {  MdSavings } from "react-icons/md";

export default function SideBar(){

  const [open,setOpen] = useState(true);

    return(
        <>
          <div className="flex">
              
                <div className={`bg-dark-purple h-screen p-4 pt-8 relative ${open ? 'w-72' : 'w-20'} duration-300`}>
                  <BsArrowLeftShort className={`text-white font-bold text-3xl text-dark-purple
                   bg-white rounded-full absolute -right-3 border-dark-purple border-2 cursor-pointer ${!open && 'rotate-180'}`}
                   onClick={()=>setOpen(!open)}
                   />
                   <div className="inline-flex">
                    <MdSavings className={`text-white font-bold text-4xl cursor-pointer block rounded float-left mr-4 t-4 rounded`}/>
                    <h1 className="origin-left">Expense Tracker</h1>
                   </div>
                </div>
            </div>
        </>
    )
}