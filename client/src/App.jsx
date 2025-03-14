import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/login';
import Freelancer from './pages/Freelancer';
import SuperAdminDashboard from './pages/SuperAdmin';
import ClientDashboard from './pages/ClientDashboard';

// import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/free" element={<Freelancer />} />
        <Route path="/superadmin" element={<SuperAdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />

        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
