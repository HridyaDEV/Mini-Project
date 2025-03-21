import React, { useEffect, useState } from "react";
import { updateUserProfile, viewUserProfile } from "../api/userApi";

function Profile() {
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        dob: "",
        email: "",
        address: "",
        state: "",
        idproof: "",
        idnumber: "",
    });

    const userId = localStorage.getItem("userId") || null;
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) {
                return;
            }

            try {
                const response = await viewUserProfile(userId);
                if (response) {
                    setFormData({
                        fullName: response.fullName || "",
                        mobile: response.mobile || "",
                        dob: response.dob ? new Date(response.dob).toISOString().split("T")[0] : "",
                        email: response.email || "",
                        address: response.address || "",
                        state: response.state || "",
                        idproof: response.idproof || "",
                        idnumber: response.idnumber || ""
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchProfile();
    }, [userId]);

    // Handle form changes when user edits fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //  Handle profile update
    const handleSave = async () => {
        try {
            const response = await updateUserProfile(userId, formData);
            if (response) {
                alert("Profile updated successfully!");
                setIsEditing(false);
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile.");
        }
    }

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
        "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
        "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
        "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ]

    const idProofOptions = ["Aadhar Card", "PAN Card", "Voter ID", "Passport",
        "Driving License"
    ];


    return (
        <div className="max-w-4xl mx-auto p-8 shadow-xl bg-white  rounded-lg mt-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Profile Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="mb-4">
                        <label className="text-gray-600 capitalize">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600 capitalize">Mobile Number</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600 capitalize">Date of Birth</label>
                        <input
                            type="text"
                            name="dob"
                            value={formData.dob}
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600 capitalize">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                            readOnly
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-4">
                        <label className="text-gray-600">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`w-full p-3 border border-gray-300 rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
                            readOnly={!isEditing}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-600">State</label>
                        <select name="state" value={formData.state} onChange={handleChange} className={`w-full p-3 border border-gray-300 rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`} disabled={!isEditing}>
                            <option value="">Select State</option>
                            {states.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                    </div>



                    <div className="mb-4">
                        <label className="text-gray-600 font-medium">ID Proof</label>
                        <select
                            name="idproof"
                            value={formData.idproof}
                            onChange={handleChange}
                            className={`w-full p-3 border border-gray-300 rounded-md transition-all duration-200 focus:outline-none ${isEditing ? "bg-white cursor-pointer" : "bg-gray-100 cursor-not-allowed"
                                }`}
                            disabled={!isEditing}
                        >
                            <option value="">Select ID Proof</option>
                            {idProofOptions.map((id, index) => (
                                <option key={index} value={id} className="text-gray-700">
                                    {id}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="mb-4">
                        <label className="text-gray-600">ID Number</label>
                        <input
                            type="text"
                            name="idnumber"
                            value={formData.idnumber}
                            onChange={handleChange}
                            className={`w-full p-3 border border-gray-300 rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
                            readOnly={!isEditing}
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="text-center mt-6">
                {isEditing ? (
                    <button
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition "
                        onClick={handleSave}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;
