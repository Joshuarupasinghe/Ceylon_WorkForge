// App.js
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';  
import  OauthSignUp from './pages/OauthSignUp';  
import  SignUp from './pages/SignUp';  

// Ensure correct path and capitalization

function App() {
  return (
    <div>
      <Routes>
        <Route path="/oauth2-callback" element={<OauthSignUp />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
