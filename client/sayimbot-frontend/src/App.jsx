import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/ui/MainLayout';
import AnalyticsOverview from './pages/Analytics';
import MaterialCount from './pages/MaterialCount';
import DataManagement from './pages/DataManagement';
import UserSettings from './pages/UserSettings';
import CameraManagement from './pages/CameraManagement';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="analytics" element={<AnalyticsOverview />} />
        <Route path="material-count" element={<MaterialCount />} />
        <Route path="data-management" element={<DataManagement />} />
        <Route path="user-settings" element={<UserSettings />} />
        <Route path="camera-management" element={<CameraManagement />} />
      </Route>
    </Routes>
  </Router>
);

export default App;