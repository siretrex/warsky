import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trophy, Medal } from "lucide-react";
import BaseURl from "../BaseURl";

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${BaseURl}/teams`);
        setTeams(res.data || []);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading leaderboard...</p>
      </div>
    );
  }

  if (!teams.length) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-400">
        <p>No teams registered yet 🥲</p>
      </div>
    );
  }

  // ✅ Calculate total = placement_points + kills
  const teamsWithTotal = teams.map((team) => ({
    ...team,
    total: (team.placement_points || 0) + (team.kills || 0),
  }));

  // ✅ Sort teams by total (highest first)
  const sortedTeams = [...teamsWithTotal].sort((a, b) => b.total - a.total);

  // 🥇 Medal colors for top 3
  const medalColors = ["text-yellow-400", "text-gray-300", "text-amber-700"];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 flex items-center justify-center gap-2">
            <Trophy className="text-yellow-400" /> Tournament Leaderboard
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            {sortedTeams[0]?.tournament_name || "Tournament"} 🏆
          </p>
        </div>

        {/* ✅ Responsive Table Wrapper */}
        <div className="bg-gray-800 rounded-2xl shadow-xl w-full overflow-x-auto">
          <table className="min-w-[500px] w-full text-left text-sm sm:text-base">
            <thead className="bg-gray-700 text-yellow-400 uppercase sticky top-0">
              <tr>
                <th className="px-4 py-3 text-center">Rank</th>
                <th className="px-4 py-3">Team Name</th>
                <th className="px-4 py-3 text-center">Total</th>
                <th className="px-4 py-3 text-center">Placement</th>
                <th className="px-4 py-3 text-center">Kills</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, index) => (
                <tr
                  key={team._id}
                  className={`border-b border-gray-700 hover:bg-gray-700/60 transition ${
                    index < 3 ? "bg-gray-700/30" : ""
                  }`}
                >
                  {/* Rank */}
                  <td className="px-4 py-3 font-bold text-center whitespace-nowrap">
                    {index < 3 ? (
                      <Medal
                        size={20}
                        className={`${medalColors[index]} inline-block`}
                      />
                    ) : (
                      `#${index + 1}`
                    )}
                  </td>

                  {/* Team name */}
                  <td className="px-4 py-3 font-semibold whitespace-nowrap">
                    {team.team_name}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-3 text-center font-bold text-green-400">
                    {team.total}
                  </td>

                  {/* Placement */}
                  <td className="px-4 py-3 text-center">
                    {team.placement_points || 0}
                  </td>

                  {/* Kills */}
                  <td className="px-4 py-3 text-center">
                    {team.kills || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 mt-6 text-xs sm:text-sm">
          WarSky Season Cup 1
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
