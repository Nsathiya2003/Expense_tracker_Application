import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {

  return (
   <BrowserRouter>
   {/* <Router> */}
      <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>


      </Routes>
   {/* </Router> */}
   </BrowserRouter>
  )
}

export default App
