import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <nav className="w-1/4 bg-blue-800 text-white p-4">
          <h2 className="text-lg font-bold mb-4">Navigation</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/analytics" className="hover:underline">Analytics Overview</Link>
            </li>
            <li>
              <Link to="/material-count" className="hover:underline">Material Count</Link>
            </li>
            <li>
              <Link to="/data-management" className="hover:underline">Data Management</Link>
            </li>
            <li>
              <Link to="/user-settings" className="hover:underline">User Settings</Link>
            </li>
            <li>
              <Link to="/camera-management" className="hover:underline">Camera Management</Link>
            </li>
            <li>
              <Link to="/logout" className="hover:underline">Logout</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="w-3/4 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;