import { useNavigate } from "react-router-dom";
import profile from "../../assets/expense1.jpg";
import { IoNotifications } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import React, { useState } from "react";
import NotificationDialog from "../../pages/notification/notification-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { useUnreadNotification } from "../../pages/notification/unread-notication";
import { useGetUser } from "../../api/users/user-hooks";
import { baseImgUrl } from "../../api/apiClient";

export default function Header() {
  const [notifyDialog, setNotifyDialog] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  /*  UNREAD CHECK */
  const { data: notificationData } = useUnreadNotification();
  console.log("data=----", notificationData);
  const hasUnread = (notificationData?.pagination?.totalPages || 0) > 0;

  console.log("hasUnread----", hasUnread);

  const handleLogout = () => {
    setLogoutConfirm(false);
    localStorage.removeItem("user_id");
    localStorage.removeItem("authToken");

    navigate("/");
  };

  const userId = localStorage.getItem("user_id");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [data, setData] = useState({
    username: "",
  });

  const { data: userData } = useGetUser(userId);
  console.log("userData---", userData, data);

  React.useEffect(() => {
    if (userData?.data) {
      console.log("userdata is---", userData?.data);
      setData({
        username: userData.data.username || "",
      });
      if (userData.data.file_path) {
        console.log("baseImgUrl---", baseImgUrl);
        setPreviewUrl(`${baseImgUrl}${userData?.data?.file_path}`);
      }
    }
  }, [userData]);

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

          {hasUnread && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
          )}
        </div>

        {/* Profile */}
        <div
          className="relative group cursor-pointer"
          onClick={() => navigate("/profile-setting")}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <img
              src={profile}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Notification Dialog */}
      <NotificationDialog
        open={notifyDialog}
        onClose={() => setNotifyDialog(false)}
      />

      {/* Logout Dialog */}
      <Dialog.Root open={logoutConfirm} onOpenChange={setLogoutConfirm}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2E2E48] text-white rounded-xl shadow-xl p-6 w-[320px] border border-gray-700">
            <Dialog.Title className="text-lg font-semibold text-center mb-2">
              Confirm Logout
            </Dialog.Title>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-lg text-sm"
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
