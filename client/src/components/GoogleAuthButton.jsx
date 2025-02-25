import 'react';
import { FcGoogle } from "react-icons/fc";
import { authService } from "../services/api";

// eslint-disable-next-line react/prop-types
const GoogleAuthButton = ({ text = "Continue with Google" }) => {
  const handleGoogleLogin = () => {
    window.location.href = authService.getGoogleAuthUrl();
  };

  return (
    <button 
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center border border-gray-300 py-4 text-2xl rounded-xl hover:bg-gray-100"
    >
      <FcGoogle size={32} className="mr-4" />
      {text}
    </button>
  );
};

export default GoogleAuthButton;