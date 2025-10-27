import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Access Redux auth state
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const links = [
    { name: "Home", href: "/" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  const handleAuthClick = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md px-6 py-4 flex justify-between items-center">
      <h1
        onClick={() => navigate("/")}
        className="text-3xl md:text-4xl font-bold text-yellow-400 font-heading cursor-pointer"
      >
      WarSky ESports
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-lg font-medium items-center">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-yellow-400 hover:text-yellow-500 transition duration-300"
            >
              {link.name}
            </a>
          </li>
        ))}

        {/* ✅ Login / Logout Button */}
        <li>
          <button
            onClick={handleAuthClick}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-yellow-400 text-3xl focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-32 bg-black/90 backdrop-blur-md md:hidden transform transition-all duration-500 ${
          isOpen
            ? "translate-y-0 rotate-0 opacity-100"
            : "-translate-y-24 -rotate-3 opacity-0"
        } flex justify-center items-center`}
      >
        <ul className="flex gap-1 flex-col text-center">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-yellow-400 hover:text-yellow-500 font-medium text-lg transition duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                handleAuthClick();
                setIsOpen(false);
              }}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
