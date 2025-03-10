import axios from "axios";

const url = "http://localhost:5111"

export const submitComplaint = async (data) => {
    try {
        const response = await axios.post(`${url}/user/complaints`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};
