import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userlogin } from '../api/authApi';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await userlogin({ email, password });
            console.log("API Response:", res.data);
            
            if (res.data.token && res.data.userFullName && res.data.userId){
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("userFullName",res.data.userFullName)
            localStorage.setItem("userId", res.data.userId);
            
            window.dispatchEvent(new Event("storage"));
            // Navigate to home page after login
            navigate("/");
            // window.location.reload(); 
            }
            else{
                    alert("invalid responses from server")
            }
        }// Ensures UI updates immediately
         catch (error) {
            console.error("Login Error:", error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder='Email'
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder='Password'
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                        Sign In
                    </button>
                </form>
                <p className="text-gray-600 text-center mt-4">
                    Don't have an account? <a href="#" className="text-blue-500" onClick={() => navigate("/register")}>Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
