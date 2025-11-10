import { useNavigate } from "react-router-dom";
import profile from "../assets/expense1.jpg";
import { IoNotifications } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import NotificationDialog from "../pages/notification/notification-dialog";
import * as Dialog from "@radix-ui/react-dialog";

export default function Header() {
  const [notifyDialog, setNotifyDialog] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogoutConfirm(false);
    console.log("User logged out");
    // Add your logout logic here (e.g. clear auth, redirect)
    navigate("/");
  };

  const handleNavigate = () => {
    navigate("/profile-setting");
  };

  return (
    <>
      <div className="w-full bg-[#2e362e] h-12 px-4 rounded-md flex items-center justify-end gap-6 text-white overflow-hidden">
        {/* Logout */}
        <div
          className="relative group cursor-pointer"
          onClick={() => setLogoutConfirm(true)}
        >
          <IoIosLogOut className="w-6 h-6 hover:text-red-500 transition" />
        </div>

        {/* Notifications */}
        <div
          className="relative group cursor-pointer"
          onClick={() => setNotifyDialog(true)}
        >
          <IoNotifications className="w-6 h-6 hover:text-green-400 transition" />
        </div>

        {/* Profile */}
        <div className="relative group cursor-pointer" onClick={handleNavigate}>
          <img
            src={profile}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Notification Dialog */}
      <NotificationDialog
        open={notifyDialog}
        onClose={() => setNotifyDialog(false)}
      />

      {/* Logout Confirmation Dialog */}
      <Dialog.Root open={logoutConfirm} onOpenChange={setLogoutConfirm}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm data-[state=open]:animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2E2E48] text-white rounded-xl shadow-xl p-6 w-[320px] border border-gray-700 animate-fadeIn">
            <Dialog.Title className="text-lg font-semibold text-center mb-2">
              Confirm Logout
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-300 text-center mb-6">
              Are you sure you want to log out of your account?
            </Dialog.Description>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg text-sm hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-lg text-sm hover:bg-red-500 transition"
              >
                Logout
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
