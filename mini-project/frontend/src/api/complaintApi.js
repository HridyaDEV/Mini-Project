import axios from "axios";

const url = "http://localhost:5111";

export const submitComplaint = async (data) => {
    try {
        // 🔹 Declare token correctly
        const token = localStorage.getItem("token"); 

        if (!token) {
            console.error("❌ No authentication token found!");
            return { message: "Unauthorized: Please log in first" };
        }

        console.log("🔹 Sending complaint request with token:", token);

        const response = await axios.post(`${url}/complaint/complaints`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` // Send token in request headers
            },
        });

        console.log("✅ Complaint submitted successfully!");
        return response;
    } catch (error) {
        console.error("❌ Error submitting complaint:", error.response?.data || error.message);
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
        console.log(("Error fetching complaints:", error.response?.data || error.mesage));
        return error.response ? error.response.data : { message: "Something went wrong" };
    }
}