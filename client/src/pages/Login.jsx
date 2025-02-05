import { useState } from "react";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Left Section */}
        <div
          className="hidden md:flex w-1/2 bg-cover bg-green-600 p-8 text-white"
          style={{ backgroundImage: "url('https://source.unsplash.com/featured/?nature')" }}
        >
          <div className="self-center">
            <h1 className="text-3xl font-bold mb-4">Design with us</h1>
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus
              nunc, ac rhoncus odio congue quis. Sed ac semper orci, eu porttitor lacus.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full md:w-1/2 p-8">
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Log in</h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Type your username and password to sign in
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <User className="absolute top-2.5 left-3 text-gray-500" size={20} />
                <input
                  className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute top-2.5 left-3 text-gray-500" size={20} />
                <input
                  className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-right text-sm text-green-600 hover:underline cursor-pointer">
                Forgot?
              </div>

              {/* Sign-in Button */}
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
              >
                Sign In
              </button>

              {/* Sign-up Link */}
              <p className="text-sm text-center mt-2 text-gray-600">
                Don’t have an account?{' '}
                <span className="text-green-600 hover:underline cursor-pointer">
                  Sign Up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
