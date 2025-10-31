import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
// import {  MdSavings } from "react-icons/md";
import { SidebarItems } from "../datas/Sidebar-items";
import logo from '../assets/expense1.jpg'
import { MdKeyboardArrowDown } from "react-icons/md";

export default function SideBar(){

  const [open,setOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const handleSubMenuToggle = (index:number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleChangeMenu = () => {
    setOpenSubMenu(null);
    setOpen(!open)
  }

  //active - bg-[#00BFA6]
    return(
        <>
         <div className="flex">
      {/* Sidebar container */}
      <div
        className={`bg-[#548f54] h-screen p-4 pt-8 relative transition-all duration-300 ${
          open ? "w-72" : "w-20"
        }`}
      >
        {/* Toggle button */}
        <BsArrowLeftShort
          className={`text-white font-bold text-3xl bg-[#2C2C2C] rounded-full absolute -right-3 border-2 border-white cursor-pointer transition-all duration-300 ${
            !open && "rotate-180"
          }`}
          onClick={() => handleChangeMenu()}
        />

        {/* Logo Section */}
        <div
          className={`transition-all duration-500 flex justify-center ${
            open ? "mt-2" : "mt-6"
          }`}
        >
          <img
            src={logo}
            alt="logo"
            className={`transition-all duration-500 rounded-full object-cover border-4 border-[#446144] shadow-md ${
              open ? "w-36 h-36" : "w-10 h-10"
            }`}
          />
        </div>

        {/* Menu Section */}
       <div className={`mt-8 text-white text-lg font-medium ${!open ? "pl-0" : "pl-2"}`}>
          {SidebarItems.map((item, index) => {
            const Icon = item.icon;
            const hasSubItems = !!item.subItems;

            return (
              <div key={index}>
                {/* Main Menu Item */}
                <ul
                  className="flex items-center gap-3 p-2 mt-4 rounded-xl cursor-pointer hover:bg-[#354135] transition-all duration-200"
                  onClick={() => hasSubItems && handleSubMenuToggle(index)}
                >
                  <li>
                    <Icon
                      className={`w-10 h-10 p-2 rounded-xl bg-[#32174D] text-white hover:bg-[#5B3256] transition-all duration-200 ${
                        !open ? "mx-auto hover:bg-" : ""
                      }`}
                    />
                  </li>

                  {/* Main label */}
                  <li
                    className={`text-[#E5E7EB] hover:text-white transition-all duration-200 ${
                      !open ? "scale-0 hidden" : ""
                    }`}
                  >
                    {item.label}
                  </li>

                  {/* Submenu arrow indicator */}
                  {hasSubItems && open && (
                    <span
                      className={`ml-auto text-xl transition-transform duration-300 ${
                        openSubMenu === index ? "" : ""
                      }`}
                    >
                      <MdKeyboardArrowDown className="w-18"/>
                    </span>
                  )}
                </ul>

                {/* Submenu items */}
                {hasSubItems && openSubMenu === index && (
                  <ul className="ml-12">
                    {item.subItems.map((sub, subIndex) => {
                      const SubIcon = sub.icon;
                      return (
                       <li
                    key={subIndex}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#415941] transition-all duration-200"
                  >
                    <div className="p-2 rounded-lg bg-[#32174D] hover:bg-[#5B3256] transition-all duration-200">
                      <SubIcon className="w-4 h-4 text-white" />
                    </div>
                    <span
                      className={`text-[#E5E7EB] hover:text-white transition-all duration-200 ${
                        !open && 'scale-0'
                      }`}
                    >
                      {sub.label}
                    </span>
                  </li>

                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
        </>
    )
}