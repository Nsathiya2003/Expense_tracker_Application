import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { SidebarItems } from "../data/Sidebar-items";
import logo from "../assets/expense1.jpg";
import { useAppContext } from "../context/AppContext";

export default function SideBar() {
  const { open, setOpen } = useAppContext();
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleChangeMenu = () => {
    setOpenSubMenu(null);
    setOpen(!open);
  };

  return (
    <div
      className={`bg-[#548f54] h-screen p-4 pt-8 relative transition-all duration-300 ${
        open ? "w-72" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <BsArrowLeftShort
        className={`text-white font-bold text-3xl bg-[#2C2C2C] rounded-full absolute -right-3 border-2 border-white cursor-pointer transition-all duration-300 ${
          !open && "rotate-180"
        }`}
        onClick={handleChangeMenu}
      />

      {/* Logo */}
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
              {/* Main Menu */}
              <NavLink
                to={item.routes}
                onClick={() => hasSubItems && handleSubMenuToggle(index)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 mt-4 rounded-xl cursor-pointer transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#72c072] text-black font-semibold"
                      : "hover:bg-[#415941]"
                  }`
                }
              >
                <Icon
                  className={`w-10 h-10 p-2 rounded-xl bg-[#32174D] text-white hover:bg-[#5B3256] transition-all duration-200 ${
                    !open ? "mx-auto" : ""
                  }`}
                />
                {open && <span>{item.label}</span>}
                {hasSubItems && open && (
                  <MdKeyboardArrowDown
                    className={`ml-auto text-xl transition-transform duration-300 ${
                      openSubMenu === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </NavLink>

              {/* Submenu */}
              {hasSubItems && openSubMenu === index && (
                <ul className="ml-12 mt-2">
                  {item.subItems.map((sub, subIndex) => {
                    const SubIcon = sub.icon;
                    return (
                      <NavLink
                        key={subIndex}
                        to={sub.routes}
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 
                          ${
                            isActive
                              ? "bg-[#72c072] text-black font-semibold"
                              : "hover:bg-[#4b664b]"
                          }`
                        }
                      >
                        <div className="p-2 rounded-lg bg-[#32174D] hover:bg-[#5B3256] transition-all duration-200">
                          <SubIcon className="w-4 h-4 text-white" />
                        </div>
                        {open && <span>{sub.label}</span>}
                      </NavLink>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
