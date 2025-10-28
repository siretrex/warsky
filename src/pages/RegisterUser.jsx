import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // npm install lucide-react
import BaseURl from "../BaseURl";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone_no: "",
    email: "",
    password: "",
    referral_code: "", // ✅ New field
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${BaseURl}/register`, formData);
      setMessage(res.data.message || "Registered successfully!");
      setFormData({
        username: "",
        phone_no: "",
        email: "",
        password: "",
        referral_code: "",
      });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-gray-800/70 backdrop-blur-lg text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="text"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* ✅ Referral Code (Optional) */}
          <div>
            <label className="block mb-1 font-medium">
              Referral Code <span className="text-gray-400 text-sm">(optional)</span>
            </label>
            <input
              type="text"
              name="referral_code"
              value={formData.referral_code}
              onChange={handleChange}
              placeholder="Enter referral code (if any)"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-semibold py-3 rounded-lg mt-4 shadow-md"
          >
            Register
          </button>

          {/* Message */}
          {message && (
            <p className="text-center mt-3 text-sm text-yellow-400 font-medium">
              {message}
            </p>
          )}
        </form>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
