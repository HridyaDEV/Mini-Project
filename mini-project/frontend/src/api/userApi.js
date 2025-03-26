
import axios from "axios"

const url= "http://localhost:5111"

export const viewUserProfile = async (id) =>{
    try {
        const response = await axios.get(`${url}/user/profile/${id}`)
        return response.data
    } catch (error) {
        console.log("Error fetching user profile:",error)
        return null
        
    }
}

export const updateUserProfile = async (id, profileData) => {
    try {
        const response = await axios.put(`${url}/user/profile/${id}`, profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        return null;
    }
}

export const getAllUsers = async () =>{
    try {
        const response = await axios.get(`${url}/user/alluser`)
        return response.data
    } catch (error) {
        console.error("Error fetching users:", error);
    return [];
    }
}