import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';  
import OauthSignUp from './pages/OauthSignUp';  
import SignUp from './pages/SignUp'; 
import ProfileForm from './pages/ProfileForm';
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/oauth2-callback" element={<OauthSignUp />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfileForm />} />
      </Routes>
    </div>
  );
}

export default App;