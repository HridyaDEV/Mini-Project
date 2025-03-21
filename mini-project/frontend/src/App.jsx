import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import ComplaintRegister from './Pages/ComplaintRegister'
import MyComplaints from './Pages/MyComplaints'
import AdminDashboard from './Pages/AdminDashboard'
import ComplaintDetails from './Pages/ComplaintDetails'
import ComplaintsAdmin from './Pages/ComplaintsAdmin'


function App() {
 
  return (
    <>
    <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/profile/:id?' element={<Profile/>}/>
    <Route path='/complaint' element={<ComplaintRegister/>}/>
    <Route path = '/mycomplaints' element = {<MyComplaints />}/>
    <Route path = '/viewcomplaint/:id' element = {<ComplaintDetails />}/>
    <Route path = '/admin' element = {<AdminDashboard/>}/>
    <Route path='/complaintadmin' element={<ComplaintsAdmin/>}/>
   </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
