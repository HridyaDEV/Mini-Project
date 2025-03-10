import axios from "axios"

const url = 'http://localhost:5111'

export const register = async (data) => {
    try {
        const response = await axios.post(`${url}/auth/register`,data)
        return response

    } catch (error) {
        return error
    }
}

export const login = async (data)=>{
    try {
        const response = await axios.post(`${url}/auth/login`,data)
        return response
        
    } catch (error) {
        return error
    }
}