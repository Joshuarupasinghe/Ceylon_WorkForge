import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';  
import OauthSignUp from './pages/OauthSignUp';  
import SignUp from './pages/SignUp'; 
import ProfileForm from './pages/FreelancerProfileForm'; 
import HomePage from './pages/HomePage'; 
import CategorySection from './pages/CategorySection';
import PostProjectForm from './pages/PostProject';  
import LoadingScreen from './pages/Loading';
import Layout from './components/Layout';
import BlogPage from './pages/bloge';
import FreelancePage from './pages/freelancepage';
import AuthCallback from './pages/AuthCallback';
import Freelancer from './pages/Freelancer';
import SuperAdminDashboard from './pages/SuperAdmin';
import ClientDashboard from './pages/client/ClientDashboard';
import './index.css';


function App() {
  return (
    <Routes>
      {/* Routes that use the Layout with the Navbar */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Category" element={<CategorySection />} />
        <Route path="/PostProject" element={<PostProjectForm />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="freelancer" element={<FreelancePage />} />
       
        
      </Route>
      
      {/* Routes without the Layout */}
      <Route path="/oauth2-callback" element={<OauthSignUp />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/superadmin" element={<SuperAdminDashboard />} />
      <Route path="/client/dashboard" element={<ClientDashboard />} />
      <Route path="/free" element={<Freelancer />} />
      <Route path="/profile" element={<ProfileForm />} />
      

    </Routes>
  );
}

export default App;