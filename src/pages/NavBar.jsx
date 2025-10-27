import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

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
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md px-4 sm:px-6 py-3 flex justify-between items-center">
      {/* Brand / Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 font-heading cursor-pointer"
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

        {/* Login / Logout Button */}
        <li>
          <button
            onClick={handleAuthClick}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-yellow-400 text-3xl focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute left-0 top-full w-full bg-black/90 backdrop-blur-md md:hidden flex flex-col items-center gap-3 py-6 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-yellow-400 hover:text-yellow-500 font-medium text-lg transition duration-300"
          >
            {link.name}
          </a>
        ))}
        <button
          onClick={() => {
            handleAuthClick();
            setIsOpen(false);
          }}
          className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
