import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Import icons for showing/hiding password
import hidePasswordImg from './images/img.png';  // Icon for hiding password (e.g., crossed eye)
import showPasswordImg from './images/icons8-eye-30.png';  // Icon for showing password (e.g., eye)

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to handle password visibility
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!email || !password) {
            toast.error('Both email and password are required.');
            return;
        }

        try {
            // Call backend API for admin login
            const response = await fetch('http://localhost:8086/api/v1/customer/adminLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const contentType = response.headers.get('Content-Type');
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }


            toast.success('Login successful!');
            console.log(data)
            // Redirect to admin dashboard after successful login
            navigate('/admin_dashboard');
        } catch (err) {
            toast.error(err.message || 'Login failed.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <ToastContainer /> {/* Toastify container for notifications */}
            <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field with Show/Hide Toggle */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle between text and password types
                                id="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                <img
                                    src={showPassword ? hidePasswordImg : showPasswordImg} // Change icon based on state
                                    alt={showPassword ? 'Hide password' : 'Show password'}
                                    className="h-6 w-6"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
