import {createContext, useState} from "react"
import axios  from 'axios';
import { toast } from 'react-toastify';


export const DoctorContext = createContext()
const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL



    const [dToken,setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken'): '');
    const [docAppointments, setDocAppointments] = useState([])

    const getAppointments = async () => {

        console.log("getAppointment")

        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}})
            if (data.success){
                setDocAppointments(data.docAppointments)
                console.log(data.docAppointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }




    const value = {
        dToken,
        setDToken,
        backendUrl,
        docAppointments,
        setDocAppointments,
        getAppointments,
    }

    return(
        <DoctorContext.Provider value ={value}>
        {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider