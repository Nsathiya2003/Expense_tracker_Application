import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import './index.css';
import ForgotPassword from './pages/Forgot-password';
import ResetPassword from './pages/Reset-password';
import MainLayout from './layout/Main-layout';

function App() {

  return (
   <BrowserRouter>
   {/* <Router> */}
      <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/dashboard' element={
            <MainLayout>
            <Dashboard/>
            </MainLayout>
            }/>
         <Route path ='/forgot-password' element={<ForgotPassword/>}/>
         <Route path ='/reset-password' element={
            <ResetPassword/>
            } />


      </Routes>
   {/* </Router> */}
   </BrowserRouter>
  )
}

export default App
