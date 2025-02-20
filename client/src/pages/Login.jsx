import { useState } from "react";
import { User, Lock } from "lucide-react";
import { authService } from "../services/api";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login(formData);
      
      // Store the token and user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Redirect to profile page after successful login
      window.location.href = "/home";
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
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
              Type your email and password to sign in
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <User className="absolute top-3 left-4 text-gray-500" size={24} />
                <input
                  className="pl-14 w-full border rounded-xl p-3 text-lg focus:outline-green-500"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute top-3 left-4 text-gray-500" size={24} />
                <input
                  className="pl-14 w-full border rounded-xl p-3 text-lg focus:outline-green-500"
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="text-right text-md text-green-600 hover:underline cursor-pointer">
                Forgot?
              </div>

              {/* Sign-in Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00ADB5] hover:bg-opacity-90 text-white py-3 text-lg rounded-xl disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Log In"}
              </button>

              {/* Sign-up Link */}
              <p className="text-md text-center mt-4 text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="text-[#00ADB5] hover:underline cursor-pointer">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}