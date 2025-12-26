import { MdMenu, MdNotificationsNone } from "react-icons/md";
import { useAppContext } from "../../context/AppContext";
import { FaRegUserCircle } from "react-icons/fa";

export function MobileHeader() {
  const { setOpen } = useAppContext();

  return (
    <header className="md:hidden sticky top-0 z-30 bg-white text-black shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <MdMenu
            className="text-2xl cursor-pointer"
            onClick={() => setOpen(true)}
          />
          <h1 className="font-semibold text-lg">Expense Tracker</h1>
        </div>

        <div className="flex items-center gap-4">
          <MdNotificationsNone className="text-2xl cursor-pointer" />
          <FaRegUserCircle className="text-2xl cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
