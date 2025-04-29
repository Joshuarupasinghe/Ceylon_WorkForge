import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor to handle common errors
api.interceptors.response.use(
  response => response,
  error => {
    // Handle common auth errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token expired or invalid, clear storage
      if (error.response.data.message === 'Token expired' || 
          error.response.data.message === 'Invalid token') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Could redirect to login here if needed
      }
    }
    return Promise.reject(error);
  }
);

// Add request interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  signup: (userData) => api.post('/auth/signup', userData),
  
  login: (credentials) => api.post('/auth/login', credentials),
  
  getGoogleAuthUrl: () => `${api.defaults.baseURL}/auth/google`,
  
  validateAuthCallback: async (token) => {
    // Store the token first
    localStorage.setItem('token', token);
    
    try {
      // Then make the API call with the token (interceptor will add it to headers)
      const response = await api.get('/auth/user/me');
      return response;
    } catch (error) {
      // If validation fails, clean up the token
      localStorage.removeItem('token');
      throw error;
    }
  },
  
  getCurrentUser: () => api.get('/auth/user/me'),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Return a resolved promise to allow chaining
    return Promise.resolve();
  },
  
  // Helper to check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export const profileService = {
  createOrUpdateProfile: (profileData) => {
    // Handle file uploads using FormData
    const formData = new FormData();
    
    // Add all profile fields to FormData
    Object.keys(profileData).forEach(key => {
      if (key === 'profileImage' && profileData[key] instanceof File) {
        formData.append(key, profileData[key]);
      } else if (profileData[key] !== null && profileData[key] !== undefined) {
        formData.append(key, profileData[key]);
      }
    });
    
    return api.post('/api/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  getProfile: () => api.get('/api/profile')
};

export default api;