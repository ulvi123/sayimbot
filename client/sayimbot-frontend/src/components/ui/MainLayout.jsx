import React from 'react';
import { Link,Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainLayout = () => {
  const API_BASE_URL = 'http://localhost:3000'
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log('AccessToken being sent:', accessToken);

      
      if (!accessToken) {
        console.error('No token found in localStorage');
        alert('You are not logged in.');
        navigate('/login');
        return;
      }
      
      const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true
      });

      console.log('Logout response:', response.data);
      // Clear all stored data
      localStorage.removeItem('accessToken');
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to logout. Error: ${error.response?.data?.message || error.message}`);
    }
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">Sayarbot</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            </li>
            <li className="mb-4">
              <Link to="/analytics" className="hover:underline">Analytics Overview</Link>
            </li>
            <li className="mb-4">
              <Link to="/data-management" className="hover:underline">Data Management</Link>
            </li>
            <li className="mb-4">
              <Link to="/user-settings" className="hover:underline">User Settings</Link>
            </li>
            <li className="mb-4">
              <Link to="/camera-management" className="hover:underline">Camera Management</Link>
            </li>
            <li>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet/>
      </main>
    </div>
  );
};

export default MainLayout;