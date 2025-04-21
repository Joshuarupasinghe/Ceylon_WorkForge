import { useState } from "react";
import { User, Mail, Lock, Building2 } from "lucide-react";
import { authService } from "../services/api";  // Import the auth service

export default function SignUp1() {
  const [role, setRole] = useState("client");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Simplified handleSubmit using the auth service
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.signup({
        ...formData,
        role,
      });
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.location.href = "/profile";
      
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "An error occurred during signup"
      );
    } finally {
      setLoading(false);
    }
  };

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

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center border rounded-lg p-2">
                <User className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full focus:outline-none bg-transparent"
                  required
                />
              </div>
              <div className="flex items-center border rounded-lg p-2">
                <User className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full focus:outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex items-center border rounded-lg p-2">
              <Mail className="text-gray-400 mr-2" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Work Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full focus:outline-none bg-transparent"
                required
              />
            </div>

            <div className="flex items-center border rounded-lg p-2">
              <Lock className="text-gray-400 mr-2" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full focus:outline-none bg-transparent"
                required
              />
            </div>

            <div className="flex items-center border rounded-lg p-2">
              <Building2 className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                name="company"
                placeholder="Company Name or Username"
                value={formData.company}
                onChange={handleChange}
                className="w-full focus:outline-none bg-transparent"
                required
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}