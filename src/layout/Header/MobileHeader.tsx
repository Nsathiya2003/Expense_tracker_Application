import { MdMenu, MdNotificationsNone } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

export function MobileHeader() {
  const { setOpen, data, previewUrl } = useAppContext();
  console.log("previewUrl in mobile header---", previewUrl, data);
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[#548f54] border-b border-gray-600">
      <div className="flex items-center px-4 h-14 gap-3">
        {/* Menu */}
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl active:scale-95 transition hover:bg-gray-100"
        >
          <MdMenu className="text-2xl text-gray-800" />
        </button>

        {/* Title (START aligned) */}
        <h1 className="text-base font-bold text-gray-100 flex-1">
          Expense Tracker
        </h1>

        {/* Actions */}
        <button className="p-2 rounded-xl active:scale-95 transition">
          <MdNotificationsNone className="text-xl text-white  -700" />
        </button>

        {/* <button className="p-2 rounded-xl active:scale-95 transition hover:bg-gray-100">
          <FaRegUserCircle className="text-xl text-gray-700" />
        </button> */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border-4 border-gray-600"
          />
        ) : (
          <FaRegUserCircle className="w-10 h-10 text-gray-700" />
        )}
      </div>
    </header>
  );
}
