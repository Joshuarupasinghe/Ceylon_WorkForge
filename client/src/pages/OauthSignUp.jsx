import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";

export default function OauthSignUp() {
  const navigate = useNavigate();
  const [loading] = useState(false);

  const handleEmailSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Section */}
        <div
          className="hidden md:flex w-1/2 bg-cover p-20 text-white"
          style={{ backgroundImage: "url('/imges/login.png')" }}
        >
          <div className="self-center">
            <h1 className="text-6xl font-bold mb-10">Design with us</h1>
            <p className="text-3xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lobortis maximus nunc, ac rhoncus odio congue quis. Sed ac semper
              orci, eu porttitor lacus.
            </p>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex w-full md:w-1/2 p-16">
          <div className="w-full">
            <h2 className="text-5xl font-bold text-gray-700 text-center mb-10">
              Sign Up for Ceylon WorkForce
            </h2>
            {/* Continue with Email Button */}
            <button 
              className="w-full bg-gray-900 text-white py-4 text-2xl rounded-xl hover:bg-opacity-90 mb-6"
              onClick={handleEmailSignup}
              disabled={loading}
            >
              Continue with Email
            </button>
            {/* Divider */}
            <div className="flex items-center justify-center my-8">
              <hr className="w-full border-gray-300" />
              <span className="px-6 text-gray-500 text-xl">OR</span>
              <hr className="w-full border-gray-300" />
            </div>
            {/* Google Auth Button */}
            <GoogleAuthButton />
          </div>
        </div>
      </div>
    </div>
  );
}