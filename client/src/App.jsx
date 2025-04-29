import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';  
import OauthSignUp from './pages/OauthSignUp';  
import SignUp from './pages/SignUp'; 
import ProfileForm from './pages/ProfileForm'; 
import HomePage from './pages/HomePage'; 
import CategorySection from './pages/CategorySection';
import PostProjectForm from './pages/PostProject';  
import LoadingScreen from './pages/Loading';
import Layout from './components/Layout';
import BlogPage from './pages/bloge';
import FreelancePage from './pages/freelancepage';


function App() {
  return (
    <Routes>
      {/* Routes that use the Layout with the Navbar */}
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/Category" element={<CategorySection />} />
        <Route path="/PostProject" element={<PostProjectForm />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="freelancer" element={<FreelancePage />} />
        
        
      </Route>
      
      {/* Routes without the Layout */}
      <Route path="/oauth2-callback" element={<OauthSignUp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      

    </Routes>
  );
}

export default App;
