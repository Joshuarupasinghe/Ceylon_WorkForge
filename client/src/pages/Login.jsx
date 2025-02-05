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
      <div className="flex w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Section */}
        <div
          className="hidden lg:flex w-1/2 bg-cover p-16 text-white"
          style={{ backgroundImage: "url('/imges/login.png')" }}
        >
          <div className="self-center">
            <h1 className="text-5xl font-bold mb-8">Design with us</h1>
            <p className="text-2xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus
              nunc, ac rhoncus odio congue quis. Sed ac semper orci, eu porttitor lacus.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full lg:w-1/2 p-12">
          <div className="w-full">
            <h2 className="text-4xl font-bold text-gray-700 text-center mb-4">Log in</h2>
            <p className="text-center text-lg text-gray-500 mb-8">
              Type your username and password to sign in
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Input */}
              <div className="relative">
                <User className="absolute top-3 left-4 text-gray-500" size={24} />
                <input
                  className="pl-14 w-full border rounded-xl p-3 text-lg focus:outline-green-500"
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute top-3 left-4 text-gray-500" size={24} />
                <input
                  className="pl-14 w-full border rounded-xl p-3 text-lg focus:outline-green-500"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-right text-md text-green-600 hover:underline cursor-pointer">
                Forgot?
              </div>

              {/* Sign-in Button */}
              <button
                type="submit"
                className="w-full bg-[#00ADB5] hover:bg-opacity-90 text-white py-3 text-lg rounded-xl"
              >
                Sign In
              </button>

              {/* Sign-up Link */}
              <p className="text-md text-center mt-4 text-gray-600">
                Don’t have an account?{" "}
                <span className="text-[#00ADB5] hover:underline cursor-pointer">
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
