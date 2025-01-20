import {createContext,useState} from "react"
import axios from "axios"
import {toast} from 'react-toastify'





export const AdminContext = createContext()


const AdminContextProvider = (props) => {


    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    
    const [doctors, setDoctors] = useState([]);

    const [transaction, setTransaction] = useState([]);
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL




    const getAllDoctors = async () => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/admin/all-doctors",
            {},
            { headers: { aToken } }
          );
        
          if (data.success) {
            setDoctors(data.message);
           
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };




    const changeAvailability = async (docId) =>{


        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}})
            if(data.success) {
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const getAllTransaction = async () => {
      try {
        const { data } = await axios.post( backendUrl + "/api/admin/getAllTransactions/",
          {},
          {headers : {aToken}}
        );
      
        if (data.success) {
          setTransaction(data.message);
          console.log(data.message)
         
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error.message)
        toast.error(error.response.data.message);
      }
    };


      
    const value = {
        aToken,setAToken,
        backendUrl,doctors,getAllDoctors,changeAvailability,getAllTransaction,transaction
    }



    return(
        <AdminContext.Provider value ={value}>
        {props.children}
        </AdminContext.Provider>
    )
};

export default AdminContextProvider