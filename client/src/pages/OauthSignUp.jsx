import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";

export default function OauthSignUp() {
  const navigate = useNavigate();
  const [loading] = useState(false);

  const handleEmailSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      {/* Container with reduced max-width */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-xl">
        
        {/* Left Section (hidden on small screens) */}
        <div className="relative hidden md:flex md:w-2/5">
          {/* Background Image */}
          <img
            src="/imges/login4.avif"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-transparent bg-opacity-40"></div>

          {/* Text Content */}
          <div className="relative p-8 text-white flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Freelance. Reinvented.</h1>
            <p className="text-base leading-relaxed">
            Ceylon WorkForce is the tech-driven platform for modern freelancers. Built for 
            speed, scale, and serious talent we connect creators and clients through smart 
            systems and real-time collaboration.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full md:w-3/5 p-6 md:p-10">
          <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-700 text-center mb-8">
              Sign Up or Login for Ceylon WorkForce
            </h2>

            {/* Continue with Email Button */}
            <button
              className="w-full bg-gray-900 text-white py-3 text-lg md:text-xl rounded-lg hover:bg-gray-800 mb-4"
              onClick={handleEmailSignup}
              disabled={loading}
            >
              Continue with Email
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center my-6">
              <hr className="w-full border-gray-300" />
              <span className="px-4 text-gray-500 text-base">OR</span>
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
