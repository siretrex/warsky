import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { useSelector } from "react-redux";

const RegisterTeam = () => {
  const location = useLocation();
  const { tournament } = location.state || {};
  const tournamentId = tournament?._id || "";
  const entryFee = tournament?.entryFee || "Free";

  // ✅ Get user data from Redux
  const user = useSelector((state) => state.auth.user);
  const userID = user?._id || null;

  const userChecker = ()=>{
    console.log(team)
  }

  const [team, setTeam] = useState({
    team_name: "",
    leaderName: user?.username || "",
    contactNumber: user?.phone_no || "",
    members: [{ name: "", inGameId: "" }],
    utrNumber: "",
    tournamentId: tournamentId,
    userId: user.id,
    leader_email: user.email
  });

  const [copied, setCopied] = useState(false);

  const UPI_ID = "yourupiid@upi";
  const QR_CODE_URL = "/qr-code.png";

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle team member input
  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    setTeam((prev) => {
      const updatedMembers = [...prev.members];
      updatedMembers[index][name] = value;
      return { ...prev, members: updatedMembers };
    });
  };

  // ✅ Add team member (max 5)
  const addMember = () => {
    if (team.members.length < 5) {
      setTeam((prev) => ({
        ...prev,
        members: [...prev.members, { name: "", inGameId: "" }],
      }));
    } else {
      alert("Max 5 members allowed!");
    }
  };

  // ✅ Copy UPI ID
  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!team.team_name || !team.leaderName || !team.contactNumber) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("https://warsakybackend.onrender.com/register-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team),
      });

      if (res.ok) {
        alert(`✅ Team Registered Successfully for ${tournament?.name || ""}`);
        setTeam({
          team_name: "",
          leaderName: user?.username || "",
          contactNumber: user?.phone_no || "",
          members: [{ name: "", inGameId: "" }],
          utrNumber: "",
          tournamentId,
          userId: userID,
          leader_email: user.email
        });
      } else {
        const errData = await res.json();
        alert(`❌ Error: ${errData.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white mt-12 shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-yellow-400 text-center">
          Register Team for {tournament?.name || "Tournament"}
        </h2>

        {/* Team Info */}
        <div>
          <label className="block text-sm mb-2">Team Name</label>
          <input
            type="text"
            name="team_name"
            value={team.team_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Leader Name</label>
          <input
            type="text"
            name="leaderName"
            value={team.leaderName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Leader Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={team.contactNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Team Members */}
        <h3 className="text-lg font-semibold">Team Members</h3>
        {team.members.map((member, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              name="name"
              value={member.name}
              onChange={(e) => handleMemberChange(index, e)}
              placeholder={`Member ${index + 1} Name`}
              required
              className="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
            <input
              type="text"
              name="inGameId"
              value={member.inGameId}
              onChange={(e) => handleMemberChange(index, e)}
              placeholder="BGMI ID"
              required
              className="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
          </div>
        ))}
        {team.members.length < 5 && (
          <button
            type="button"
            onClick={addMember}
            className="w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            ➕ Add Member
          </button>
        )}

        {/* Payment Section — only if entryFee is not "Free" */}
        {entryFee.toLowerCase() !== "free" && (
          <>
            <h3 className="text-lg font-semibold mt-6">Payment Details</h3>
            <div className="p-4 bg-gray-700 rounded-xl text-center space-y-3">
              <p className="text-sm">
                Pay entry fee via UPI: <strong>{entryFee}</strong>
              </p>
              <div className="flex items-center justify-center space-x-2">
                <span className="font-bold">{UPI_ID}</span>
                <button
                  type="button"
                  onClick={copyUPI}
                  className="p-1 bg-gray-600 rounded hover:bg-gray-500"
                >
                  {copied ? (
                    <Check size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
              <img
                src={QR_CODE_URL}
                alt="UPI QR Code"
                className="mx-auto w-40 h-40 rounded-lg border border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 mt-3">
                Enter 12-digit UTR Number
              </label>
              <input
                type="text"
                name="utrNumber"
                value={team.utrNumber}
                onChange={handleChange}
                required
                maxLength="12"
                className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
              />
            </div>
          </>
        )}

        {/* Discord Section */}
        <div className="text-center space-y-2">
          <p className="text-sm">Send your payment screenshot on Discord:</p>
          <a
            href="https://discordapp.com/users/YOUR_DISCORD_ID"
            target="_blank"
            rel="noreferrer"
            className="w-full block py-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition"
          >
            📩 Send Screenshot on Discord
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition"
        >
          Register Team
        </button>
      </form>
    </div>
  );
};

export default RegisterTeam;
