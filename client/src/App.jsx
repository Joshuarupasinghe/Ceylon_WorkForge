// App.js
import { Route, Routes } from 'react-router-dom';
// import LoginPage from './pages/login';  
// import  SignupPage from './pages/Sign Up';  
import  SignUp1 from './pages/SignUp1';  

// Ensure correct path and capitalization

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<SignUp1 />} />
      </Routes>
    </div>
  );
}

export default App;
