import React from 'react';
import { Link,Outlet } from 'react-router-dom';

const MainLayout = () => {
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
              <Link to="/logout" className="hover:underline">Logout</Link>
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