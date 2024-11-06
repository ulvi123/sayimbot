import React from 'react';
import { BrowserRouter as Router, Routes, Route,Outlet } from 'react-router-dom';
import MainLayout from './components/ui/MainLayout';
import AnalyticsOverview from './pages/Analytics';
import DataManagement from './pages/DataManagement';
import UserSettings from './pages/UserSettings';
import CameraManagement from './pages/CameraManagement';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<AnalyticsOverview />} />
        <Route path="/data-management" element={<DataManagement />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/camera-management" element={<CameraManagement />} />
      </Route>
    </Routes>
  </Router>
);

export default App;