import { useNavigate } from "react-router-dom";
import profile from "../assets/expense1.jpg";
import { IoNotifications } from "react-icons/io5";
import { useState } from "react";
import NotificationDialog from "../pages/notification/notification-dialog";

export default function Header() {
  const [notifyDialog, setNotifyDialog] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/profile-setting");
  };
  return (
    <>
      <div className="w-full bg-[#2e362e] h-12 p-2 rounded-md flex justify-end hover:cursor-pointer">
        <IoNotifications
          className="mt-2 w-16 h-6 text-white"
          onClick={() => setNotifyDialog(true)}
        />
        <img
          src={profile}
          alt="profile"
          className="w-8 h-8 rounded-full mr-4"
          onClick={handleNavigate}
        />
      </div>
      <NotificationDialog
        open={notifyDialog}
        onClose={() => setNotifyDialog(false)}
      />
    </>
  );
}
