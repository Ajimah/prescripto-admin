import { createContext, useState, useCallback } from "react"
import axios from "axios"
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'): '');
    const [doctors, setDoctors] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [appointments,setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false)
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // const handleApiError = (error) => {
    //     const errorMessage = error.response?.data?.message || error.message
    //     toast.error(errorMessage)
    //     console.error('API Error:', error)
    // }

    const getAllDoctors = useCallback(async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/all-doctors`,
                {},
                { headers: { aToken } }
            )
            
            if (data.success) {
                setDoctors(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }, [aToken, backendUrl])

    const changeAvailability = useCallback(async (docId) => {
        setIsLoading(true)
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/change-availability`,
                { docId },
                { headers: { aToken } }
            )
            
            if (data.success) {
                toast.success(data.message)
                await getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }, [aToken, backendUrl, getAllDoctors])

    const getAllTransaction = useCallback(async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/getAllTransactions/`,
                {},
                { headers: { aToken } }
            )
            
            if (data.success) {
                setTransaction(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }, [aToken, backendUrl])


    //getting all appointments


    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})
            if (data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }finally {
            setIsLoading(false)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment' ,{appointmentId},{headers:{aToken}} )

            if (data.success){
                toast.success(data.message)
                getAllAppointments()

            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

        const getDashData = async () => {
            try {
                const {data} = await axios.get(backendUrl + '/api/admin/dashboard' , {headers:{aToken}})

                if(data.success){
                    setDashData(data.dashData)
                    
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(data.message)
            }
        }



    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        getAllTransaction,
        transaction,
        isLoading,
        appointments, 
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider