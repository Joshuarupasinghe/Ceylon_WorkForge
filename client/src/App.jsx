// App.js
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import Freelancer from'./pages/Freelancer';
// Ensure correct path and capitalization

function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/free" element={<Freelancer />} />
      </Routes>
    </div>
  );
}

export default App;
