import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { profileService } from '../services/api';

const ProtectedRoute = ({ redirectPath = '/profile' }) => {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  
  useEffect(() => {
    const checkProfile = async () => {
      try {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Check if profile exists
        const response = await profileService.getProfile();
        setHasProfile(!!response.data);
        setLoading(false);
      } catch (error) {
        // If 404, profile doesn't exist
        if (error.response && error.response.status === 404) {
          setHasProfile(false);
        } else {
          console.error("Error checking profile:", error);
        }
        setLoading(false);
      }
    };
    
    checkProfile();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }
  
  // If user has no profile, redirect to profile creation
  if (!hasProfile) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If user has profile, render the child routes
  return <Outlet />;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string
};

// Add default props
ProtectedRoute.defaultProps = {
  redirectPath: '/profile'
};

export default ProtectedRoute;