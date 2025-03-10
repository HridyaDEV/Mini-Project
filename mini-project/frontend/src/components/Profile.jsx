import React, { useEffect, useState } from 'react';
import { viewUserProfile } from '../api/userApi';
import { useParams } from 'react-router-dom';

function Profile() {
    
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        dob: "",
        email: "",
        password: "",
        address: "",
        state: "",
        idproof: "",
        idnumber: ""
    });

    const { id } = useParams();

    const handleView = async () => {
      
        if (!id) return;
    
        try {
            const response = await viewUserProfile(id);
           
            if (response?.status === 200) {
                setFormData(response?.data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
       handleView();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Profile Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
                <div>
                    <div className="mb-4">
                        <input 
                            type="text" name="fullName" placeholder="Full Name" 
                            value={formData.fullName} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="text" name="mobile" placeholder="Mobile Number" 
                            value={formData.mobile} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="text" name="dob" placeholder="Date of Birth" 
                            value={formData.dob} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="email" name="email" placeholder="Email" 
                            value={formData.email} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="password" name="password" placeholder="Password" 
                            value={formData.password} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

               
                <div>
                    <div className="mb-4">
                        <input 
                            type="text" name="address" placeholder="Address" 
                            value={formData.address} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            name="state" value={formData.state} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        >
                            <option value="" disabled>Select a State</option>
                            <option value="kerala">Kerala</option>
                            <option value="tamilnadu">Tamil Nadu</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="telangana">Telangana</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="goa">Goa</option>
                            <option value="westbengal">West Bengal</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <select
                            name="idproof" value={formData.idproof} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        >
                            <option value="" disabled>ID Proof</option>
                            <option value="aadhar">Aadhar</option>
                            <option value="drivinglisence">Driving License</option>
                            <option value="voterid">Voter ID</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <input 
                            type="text" name="idnumber" placeholder="ID Number" 
                            value={formData.idnumber} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 text-center">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Profile;
