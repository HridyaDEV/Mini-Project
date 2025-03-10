import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        dob: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.fullName) {
            setError("Full Name is required");
            return false;
        }
        if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) {
            setError("Enter a valid 10-digit Mobile Number");
            return false;
        }
        if (!formData.dob) {
            setError("Date of Birth is required");
            return false;
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Enter a valid Email");
            return false;
        }
        if (!formData.password || formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await register(formData);
                if (response.status === 201) {
                    alert("Sign up Successful!");

                    
                    // Store token and user details in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userFullName", formData.fullName);
                localStorage.setItem("userEmail", formData.email);

                    navigate("/"); // Redirect to homepage
                    window.dispatchEvent(new Event("storage"));  // 🚀 Notify other components that localStorage has changed
                } else {
                    setError(response.data.error || "Registration failed");
                }
            } catch (error) {
                setError("Registration failed");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input 
                            type="text" name="fullName" placeholder='Full Name'
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            value={formData.fullName} onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="text" name="mobile" placeholder='Mobile Number'
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            value={formData.mobile} onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="date" name="dob" placeholder='Date of Birth'
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            value={formData.dob} onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="email" name="email" placeholder='Email'
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            value={formData.email} onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="password" name="password" placeholder='Password'
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            value={formData.password} onChange={handleChange} 
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded border-r-2 hover:bg-blue-600 transition">
                        Sign Up
                    </button>
                </form>
                <p className="text-gray-600 text-center mt-4">
                    Already have an account? <a href="#" className="text-blue-500" onClick={() => navigate("/login")}>Log in</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
