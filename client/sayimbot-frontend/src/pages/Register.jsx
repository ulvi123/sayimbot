import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const API_URL = 'http://localhost:3000';
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Registration successful:', data);
          alert('Registration successful!Please log in to continue to the platform');
          // Handle successful registration (e.g., redirect to login page)
          navigate('/login');
        } catch (error) {
          console.error('Registration error:', error);
          // Handle registration error (e.g., show error message to user)
        }
      };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
            <form onSubmit={handleRegister} className="bg-white p-10 rounded-[20px] shadow-lg w-1/3 transition-transform transform hover:scale-105">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Hesab Yaradın</h2>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">İstifadəçi adı</label>
                    <input
                        type="text"
                        placeholder="İstifadəçi adını seçin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-[20px] p-3 text-lg transition duration-200 focus:outline-none focus:ring-0 placeholder-gray-400"
                        required
                    />
                </div>
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
                        placeholder="Şifrə seçin"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-[20px] p-3 text-lg transition duration-200 focus:outline-none focus:ring-0 placeholder-gray-400"
                        required
                    />
                </div>
                <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-[20px] shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105">Qeydiyyatdan Keç</Button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Artıq hesabınız var? <a href="/login" className="text-blue-600">Daxil olun</a>
                </p>
            </form>
        </div>
    );
};

export default Register;