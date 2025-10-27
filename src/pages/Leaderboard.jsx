import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trophy, Medal } from "lucide-react";

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/teams");
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

  // ✅ Sort by total_points descending
  const sortedTeams = [...teams].sort((a, b) => b.total_points - a.total_points);

  // 🥇 Medal colors
  const medalColors = ["text-yellow-400", "text-gray-300", "text-amber-700"];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-yellow-400 flex items-center justify-center gap-2">
            <Trophy className="text-yellow-400" /> Tournament Leaderboard
          </h1>
          <p className="text-gray-400 mt-2">
            {sortedTeams[0]?.tournament_name || "Tournament"} 🏆
          </p>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-700 text-yellow-400 text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Team Name</th>
                <th className="px-4 py-3">Leader</th>
                <th className="px-4 py-3 text-center">Kills</th>
                <th className="px-4 py-3 text-center">Matches</th>
                <th className="px-4 py-3 text-center">Points</th>
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
                  {/* Rank / Medal */}
                  <td className="px-4 py-3 font-bold text-center">
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
                  <td className="px-4 py-3 font-semibold">{team.team_name}</td>

                  {/* Leader name */}
                  <td className="px-4 py-3 text-gray-300">{team.leader_name}</td>

                  {/* Kills */}
                  <td className="px-4 py-3 text-center">{team.kills}</td>

                  {/* Matches */}
                  <td className="px-4 py-3 text-center">{team.matches_played}</td>

                  {/* Total points */}
                  <td className="px-4 py-3 text-center font-bold text-green-400">
                    {team.total_points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 mt-6 text-sm">
          Updated automatically from MongoDB ⚡
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
