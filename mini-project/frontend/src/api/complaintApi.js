import axios from "axios";

const url = "http://localhost:5111";

export const submitComplaint = async (data) => {
    try {
        //  Declare token correctly
        const token = localStorage.getItem("token"); 

        if (!token) {
            return { message: "Unauthorized: Please log in first" };
        }

        const response = await axios.post(`${url}/complaint/complaints`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` // Send token in request headers
            },
        });

        return response;
    } catch (error) {
        return error.response ? error.response.data : { message: "Something went wrong" };
    }
};

export const getUserComplaints = async () => {
    try {
        const token = localStorage.getItem("token")
        if(!token){
            console.log("No authentication token found")
            return{ message :"Unauthorized: Please log in first"}
            
        }
        const response = await axios.get(`${url}/complaint/mycomplaints`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        return response.data;
    } catch (error) {
        console.log(("Error fetching complaints:", error.response?.data || error.message));
        return error.response ? error.response.data : { message: "Something went wrong" };
    }
}

export const getComplaintById = async (id) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return { message: "Unauthorized: Please log in first" };
        }

        const response = await axios.get(`${url}/complaint/viewcomplaint/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.log("Error fetching complaint:", error.response?.data || error.message);
        return error.response ? error.response.data : { message: "Something went wrong" };
    }
};
