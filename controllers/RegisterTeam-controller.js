const Team = require("../models/Team-model");

// ✅ Register a new team
const registerTeam = async (req, res) => {
  try {
    const {
      team_name,
      leaderName,
      leader_email,
      contactNumber,
      members,
      utrNumber,
      userId,
      tournamentId
    } = req.body;

    console.log(req.body)

    // ✅ Basic validation
    if (!team_name || !leaderName || !contactNumber || !members?.length)
      return res.status(400).json({ message: "All required fields missing" });

    // ✅ Prevent duplicate team name
    const existingTeam = await Team.findOne({ team_name });
    if (existingTeam)
      return res.status(400).json({ message: "Team name already registered" });

    // ✅ Create new team
    const newTeam = new Team({
      team_name,
      leader_name: leaderName,
      leader_email: leader_email,
      contact_number: contactNumber,
      userid:userId,
      utr_number:utrNumber,
      tournament_id: tournamentId, // or you can populate tournament name here
      members: members.map((m) => ({
        ign: m.name,
        uid: m.inGameId,
      })),
    });

    await newTeam.save();

    res.status(201).json({
      message: "Team registered successfully",
      team: newTeam,
    });
  } catch (error) {
    console.log("error")
    console.log(error)
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get all registered teams (optional for admin)
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerTeam, getAllTeams };
