import { useState } from "react";
import { User, Mail, Lock, Building2 } from "lucide-react";

export default function SignUp1() {
  const [role, setRole] = useState("client");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div
          className="hidden md:flex flex-col justify-center items-start p-10 text-white bg-cover"
          style={{ backgroundImage: "url('/imges/login1.png')" }}
        >
          <h2 className="text-3xl font-bold mb-4 text-black">Design with us</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lobortis maximus nunc, ac rhoncus odio congue quis. Sed ac semper
            orci, eu porttitor lacus.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-500 mb-6">Create your free account</p>

          {/* Form Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center border rounded-lg p-2">
                <User className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              <div className="flex items-center border rounded-lg p-2">
                <User className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex items-center border rounded-lg p-2">
              <Mail className="text-gray-400 mr-2" size={20} />
              <input
                type="email"
                placeholder="Work Email"
                className="w-full focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded-lg p-2">
              <Lock className="text-gray-400 mr-2" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded-lg p-2">
              <Building2 className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Company Name or Username"
                className="w-full focus:outline-none bg-transparent"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-gray-500 block mb-1">I am a:</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="freelancer"
                    checked={role === "freelancer"}
                    onChange={() => setRole("freelancer")}
                  />
                  <span>Freelancer</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={role === "client"}
                    onChange={() => setRole("client")}
                  />
                  <span>Client</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded-lg">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
