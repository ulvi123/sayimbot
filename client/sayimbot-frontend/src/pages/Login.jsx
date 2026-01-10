import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const API_BASE_URL = 'http://localhost:3000'; // Adjust this to your NestJS server URL
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            console.log('Login response:', data);
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                console.log('AccessToken stored in localStorage:', localStorage.getItem('accessToken'));
                setShowModal(true);
                // Handle user data
                const userData = data.users; // or data.user, depending on your backend
                console.log('User data:', userData);
            } else {
                // Unexpected response format
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(`Login failed: ${error.message}`);
        }
    };


    const handleCloseModal = () => {
        setShowModal(false)
        navigate('/dashboard');
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
                <form onSubmit={handleLogin} className="bg-white p-10 rounded-[20px] shadow-lg w-1/3 transition-transform transform hover:scale-105">
                    <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Daxil Olun</h2>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Emailinizi daxil edin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-[20px] p-3 text-lg transition duration-200 focus:outline-none focus:ring-0 placeholder-gray-400"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Şifrə</label>
                        <input
                            type="password"
                            placeholder="Şifrənizi daxil edin"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-[20px] p-3 text-lg transition duration-200 focus:outline-none focus:ring-0 placeholder-gray-400"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-[20px] shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105">Daxil Ol</Button>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Hesabınız yoxdur? <a href="/register" className="text-blue-600">Qeydiyyatdan keçin</a>
                    </p>
                </form>

            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                        <h2 className="text-2xl font-bold mb-4">Daxil Olma Uğurlu Oldu</h2>
                        <p className="mb-6">Sistemə uğurla daxil oldunuz!</p>
                        <button 
                            onClick={handleCloseModal}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            İdarə Panelə Keçid
                        </button>
                    </div>
                </div>
            )}
        </>

    );
};

export default Login;