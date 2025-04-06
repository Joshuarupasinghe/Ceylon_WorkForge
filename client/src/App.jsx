import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';  
import OauthSignUp from './pages/OauthSignUp';  
import SignUp from './pages/SignUp'; 
import ProfileForm from './pages/ProfileForm';
import AuthCallback from './pages/AuthCallback';
import Freelancer from './pages/Freelancer';
import SuperAdminDashboard from './pages/SuperAdmin';
import ClientDashboard from './pages/ClientDashboard';
import './index.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/oauth2-callback" element={<OauthSignUp />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/free" element={<Freelancer />} />
        <Route path="/superadmin" element={<SuperAdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
      </Routes>
    </div>
  );
}

export default App;