//import React from 'react'
import { useContext } from 'react';
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AdminContext} from './context/AdminContext'
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import Payment from './pages/Admin/Payment'
import { DoctorContext } from './context/doctorContext';
import DoctorDashboard from './pages/Admin/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Admin/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Admin/Doctor/DoctorProfile';

const App = () => {

  const {aToken} =  useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)


  return aToken || dToken ? (
    <div className='bg-[#f8f9fd]'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          {/* Admin route */}
          <Route path= '/' element={<></>}/>
          <Route path= '/admin-dashboard' element={<Dashboard/>}/>
          <Route path= '/all-appointment' element={<AllAppointment/>}/>
          <Route path= '/add-doctor' element={<AddDoctor/>}/>
          <Route path= '/doctors-list' element={<DoctorsList/>}/>
          <Route path= '/payment' element={<Payment/>}/>
          {/* Doctor route */}
          <Route path= '/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path= '/doctor-appointment' element={<DoctorAppointment/>}/>
          <Route path= '/doctor-profile' element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login/>
    </>
  )
}

export default App