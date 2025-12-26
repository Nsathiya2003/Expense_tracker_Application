import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import SideBar from "./Sidebar";
import { MobileHeader } from "./Header/MobileHeader";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar (desktop only for now) */}
      <div className="hidden md:block">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="block md:hidden">
          <MobileHeader />
        </div>

        <div className="hidden md:block">
          <Header />
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
