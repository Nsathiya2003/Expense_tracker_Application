import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
   <BrowserRouter>
   {/* <Router> */}
      <Routes>
        <Route path='/' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>

      </Routes>
   {/* </Router> */}
   </BrowserRouter>
  )
}

export default App
