// src/components/Auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import { useAuth } from '../../AuthContext';
import { loginUser } from '../../api';

const Login = () => {
    const { setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const navigate = useNavigate()


   const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const loginData = { email, password };
        const response = await loginUser(loginData);
        
        if (response.data.success) {
            // Store actual user data instead of just `true`
            setUser(response.data.user); // Update this line
            alert(response.data.message);
            navigate("/");
            console.log(3,"3")
        } else {
            alert(response.data.message);
            console.log(4,"4")
        }
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : 'Login failed. Please try again.');
    }
};


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back!</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
