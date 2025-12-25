// import profile from '../assets/expense1.jpg';

// import { useEffect } from "react";
import Cards from "../component/dashboard-cards";
import IncomeExpenseChart from "../component/dashboard-chart-bar";
import SpendHistory from "../component/spend-history";
import WelcomeProfileComponent from "../component/welcome-profile";
// import { getFCMToken } from "../firebase/getFCMToken";
// // import { useGetUser } from "../api/users/user-hooks";
// import { onMessageListener } from "../firebase/firebase";

export default function Dashboard() {
  //call an firebase function to get the token

  //   const userId = localStorage.getItem("user_id");
  //   const { data: userData } = useGetUser(userId);

  // useEffect(() => {
  //   const unsubscribe = onMessageListener((payload) => {
  //     alert(payload.notification?.title);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const saveToken = async () => {
  //     const token = await getFCMToken();
  //     console.log("Dashboard FCM token:", token);

  //     if (token) {
  //       await fetch("http://localhost:3000/api/notification/save-fcm-token", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ token }),
  //       });
  //     }
  //   };

  //   saveToken();
  // }, []);

  return (
    <>
      <div className="flex justify-start ">
        <div>
          <WelcomeProfileComponent />
          <Cards />
          <div className="flex flex-row">
            <IncomeExpenseChart />
            <SpendHistory />
          </div>
        </div>
      </div>
    </>
  );
}
