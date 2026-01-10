import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


const API_BASE_URL = 'http://localhost:3000';
const UserSettings = () => {


  const [user, setUser] = useState(
    {
      username: '',
      email: '',
      password: ''
    }
  )
  const [message, setMessage] = useState('')
  useEffect(() => {
    fetchUserData();
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      console.log('Token in handleSubmit:', token);  // Debugging line
      const response = await axios.get(`${API_BASE_URL}/auth/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { password, ...userWithoutPassword } = response.data;
      setUser(userWithoutPassword);
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      setMessage(`Error: ${error.response?.data?.message || 'Failed to fetch user data'}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    console.log('Token in handleSubmit:', token);
    try {
      const response = await axios.put(`${API_BASE_URL}/auth/user`, user, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }); // Adjust the API endpoint as needed
      setMessage('User settings updated successfully');
      setUser(response.data);
    } catch (error) {
      console.error('Error updating user settings:', error);
      setMessage('Failed to update user settings');
    }
  };



  return (
    <div className="flex flex-col items-start p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-2">İstifadəçi parametrləri</h1>
      <p className="mb-6 text-gray-600">Parametrlərinizi dəyişdirin</p>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            İstifadəçi adı
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name='username'
            value={user.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            E-poçt
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name='email'
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Yeni Şifrə
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Dəyişiklikləri Saxla
        </button>
      </form>
    </div>
  );
};

export default UserSettings;