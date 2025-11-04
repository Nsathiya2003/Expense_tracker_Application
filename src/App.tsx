import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import './index.css';
import ForgotPassword from './pages/Forgot-password';
import ResetPassword from './pages/Reset-password';
import MainLayout from './layout/Main-layout';
import ProfileSetting from './pages/Profile-setting';

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
          <Route path="/profile-setting" element={<ProfileSetting/>}/>
          {/* <Route path="/expense" element={<Expense />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
