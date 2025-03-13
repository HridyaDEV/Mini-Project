import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Home from './components/Home'
import UserHome from './components/UserHome'
import Login from './components/Login'
import Profile from './components/Profile'
import ComplaintRegister from './components/ComplaintRegister'
import MyComplaints from './components/MyComplaints'

function App() {
 
  return (
    <>
    <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/userhome' element={<UserHome/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/profile/:id?' element={<Profile/>}/>
    <Route path='/complaint' element={<ComplaintRegister/>}/>
    <Route path = '/mycomplaints' element = {<MyComplaints/>}/>
   </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
