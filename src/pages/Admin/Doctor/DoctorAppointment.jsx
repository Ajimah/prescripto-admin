import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../../context/doctorContext'
import { useEffect,useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { assets } from '../../../assets/assets';


const DoctorAppointment = () => {

  const {dToken, docAppointments, getAppointments} = useContext(DoctorContext)
  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)
  const [appointments, setAppointments] = useState([])





  useEffect(() => {
    if(docAppointments.length > 0){
      setAppointments(docAppointments)
    }
  },[docAppointments])


  useEffect(() =>{
    if(dToken){
      getAppointments()
    }
  
  },[dToken])

  


  return (
    <div className='w-full max-w-6xl m-5 '>
      <p className='mb-3 text-lg font-medium'>All Appointment</p>
      <div className='bg-white border rounded  text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
      <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
        <p>#</p>
        <p>patient</p>
        <p>payment</p>
        <p>age</p>
        <p>date</p>
        <p>fee</p>
        <p>action</p>
      </div>

          {
            appointments.map((item,index) => (
              <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b' key={index}>
                  <p>{index+1}</p>
                  <div>
                    <img src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
                  </div>
                  <div>
                    <p>
                      {item.payment ? 'Online' : 'Cash'}
                    </p>
                  </div>
                  <p>{calculateAge(item.userData.dob)}</p>
                  <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                  <p>{currency}{item.amount}</p>
                  <div>
                    <img src={assets.cancel_icon} alt="" />
                    <img src={assets.tick_icon} alt="" />
                  </div>
              </div>
            ))
          }
         
      </div>
    </div>
  )
}

export default DoctorAppointment