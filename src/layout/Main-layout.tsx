// MainLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 p-2">
        {/* Header on top */}
        <Header />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto rounded-tl-2xl">
          {<Outlet />}     
             </main>
      </div>
    </div>
  );
}
