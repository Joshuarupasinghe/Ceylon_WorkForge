// App.js
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
// Ensure correct path and capitalization

function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
