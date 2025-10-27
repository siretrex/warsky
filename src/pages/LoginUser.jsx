import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // npm install lucide-react
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice"; // ✅ Redux action
import { useSelector } from "react-redux";

const LoginUser = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      // ✅ Backend login API
      const res = await axios.post("https://warsakybackend.onrender.com/login", formData);

      // ✅ Save token & update Redux
      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      console.log(res.data.user)
      setMessage("Login successful! Redirecting...");
      setFormData({ email: "", password: "" });
      
  
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-gray-800/70 backdrop-blur-lg text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-semibold py-3 rounded-lg mt-4 shadow-md"
          >
            Login
          </button>

          {/* Message */}
          {message && (
            <p className="text-center mt-3 text-sm text-yellow-400 font-medium">
              {message}
            </p>
          )}
        </form>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-yellow-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginUser;
