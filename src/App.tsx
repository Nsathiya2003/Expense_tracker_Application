import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import ForgotPassword from "./pages/Forgot-password";
import ResetPassword from "./pages/Reset-password";
import MainLayout from "./layout/Main-layout";
import ProfileSetting from "./pages/Profile-setting";
import Income from "./pages/transaction/Income";
import Expense from "./pages/transaction/Expense";
import Budget from "./pages/transaction/Budget";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Without layout */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* With layout (Sidebar + Header always visible) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path="/transaction" element={<Income />} />
          <Route path="/transaction/income" element={<Income />} />
          <Route path="/transaction/expense" element={<Expense />} />
          <Route path="/budget" element={<Budget />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
