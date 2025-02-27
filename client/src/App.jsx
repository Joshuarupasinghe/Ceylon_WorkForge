import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/login';
import Freelancer from './pages/Freelancer';
// import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/free" element={<Freelancer />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
