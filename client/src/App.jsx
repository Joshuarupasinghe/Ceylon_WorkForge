import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import Freelancer from './pages/Freelancer';
import SuperAdminDashboard from './pages/SuperAdmin';
import ClientDashboard from './pages/ClientDashboard';
import './index.css';



function App() {
  return (
    <Routes>
      {/* Redirect root ("/") to Sign In page */}
      <Route path="/" element={<Navigate to="/auth/login" />} />
      
      {/* Other routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/free" element={<Freelancer />} />
      <Route path="/superadmin" element={<SuperAdminDashboard />} />
      <Route path="/client" element={<ClientDashboard />} />
      

    </Routes>
  );
}

export default App;
