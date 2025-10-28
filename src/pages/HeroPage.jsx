import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoSection from "./VideoSection";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import BaseURl from "../BaseURl";

const HeroPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      console.log("User refreshed the page!");
    } else {
      console.log("User opened page normally.");
    }

    axios
      .get(`${BaseURl}/tournament`)
      .then((res) => {
        setTournaments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tournaments:", err);
      });
  }, []);

  const handleRegister = (tournament) => {
    navigate("/register-team", { state: { tournament } });
  };

  return (
    <>
      {/* Background Video */}
      <div className="fixed inset-0 -z-10">
        <VideoSection />
      </div>

      <div className="relative z-10 text-white font-body">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-md fixed top-0 w-full z-20">
          <Navbar />
        </nav>

        {/* Hero Section */}
        <section className="w-full h-screen flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-8xl font-extrabold text-yellow-400 mb-4 font-heading drop-shadow-lg animate-pulse">
            WarSky ESports
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-6 font-body">
            Compete. Stream. Win. <br />
            The ultimate arena for BGMI tournaments
          </p>
          <button
            className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 transition text-lg"
            onClick={() =>
              document.getElementById("tournaments").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            View Tournaments
          </button>
          <button
            className="bg-yellow-400 text-black mt-3 px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 transition text-lg"
            onClick={() => navigate("/leaderboard") }
          >
            View Leaderboard
          </button>
        </section>

        {/* Tournaments Section */}
        <section
          id="tournaments"
          className="w-full py-20 px-4 bg-black/50 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-12 font-heading text-center">
            Current & Upcoming Tournaments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
            {tournaments.length === 0 ? (
              <p className="text-white text-lg">No tournaments available.</p>
            ) : (
              tournaments.map((t) => (
                <div
                  key={t._id}
                  className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:scale-105 transform transition"
                >
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                    {t.name}
                  </h3>
                  <p className="text-white mb-1 font-body">
                    Entry Fee: {t.entryFee}
                  </p>
                  <p className="text-white mb-1 font-body">
                    Start: {new Date(t.startDate).toLocaleDateString()} | End:{" "}
                    {new Date(t.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-white mb-4 font-body">
                    Prize: {t.prizePool}
                  </p>
                  {t.rules.length > 0 && (
                    <ul className="text-white mb-4 list-disc list-inside">
                      {t.rules.map((rule, i) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-white mb-4 font-body">
                    Status: {t.status}
                  </p>
                  <button
                    className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 transition"
                    onClick={() => handleRegister(t)}
                  >
                    Register / Manage
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Floating Social Buttons */}
        <div className="fixed right-3 top-1/3 flex flex-col gap-3 z-50">
          <a
            href="https://www.instagram.com/warsky_org?igsh=Y2k3dmk5dHF3dmNm"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 p-3 rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-110"
          >
            <i className="fab fa-instagram text-white text-xl md:text-2xl"></i>
          </a>
          <a
            href="https://youtube.com/@warskyesports?si=x1IDyLauAvdhveUb"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 p-3 rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-110"
          >
            <i className="fab fa-youtube text-white text-xl md:text-2xl"></i>
          </a>
          <a
            href="https://wa.me/917579351992"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110"
          >
            <i className="fab fa-whatsapp text-white text-xl md:text-2xl"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default HeroPage;
