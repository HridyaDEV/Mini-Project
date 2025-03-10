
import axios from "axios"


const url= "http://localhost:5111"

// export const register = async (data) => {
//     try {
//         const response = await axios.post(`${url}/user/register`,data)
//         return response
        
//     } catch (error) {
//         return error.message
//     }
// }

export const viewUserProfile = async (id) =>{
    try {
        const response = await axios.get(`${url}/user/profile/${id}`)
        return response
    } catch (error) {
        return error
    }
}