import {  useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/api';


export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  
  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const role = searchParams.get('role');

    console.log('token', token);
    
    if (!token) {
      setError('Authentication failed. No token received.');
      return;
    }
    
    const handleAuth = async () => {
      try {
        const response = await authService.validateAuthCallback(token);
        const userData = {
          id: userId || response.data.user.id,
          firstName: response.data.user.firstName || '',
          lastName: response.data.user.lastName || '',
          email: response.data.user.email || '',
          role: role || response.data.user.role,
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/profile');
      } catch (err) {
        console.error('Auth validation error:', err);
        setError('Failed to validate your authentication. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };
    
    handleAuth();
  }, [searchParams, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-lg text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">Authentication Error</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm">Redirecting you back to login...</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="animate-pulse">
            <div className="w-16 h-16 rounded-full bg-blue-400 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold mt-6">Authenticating</h2>
          <p className="text-gray-600 mt-2">Please wait while we complete your sign in...</p>
        </div>
      )}
    </div>
  );
}