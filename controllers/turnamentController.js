const Tournament = require("../models/Tournament");

// ✅ Add a new tournament
const addTournament = async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      entryFee,
      prizePool,
      rules,
      status,
    } = req.body;
    console.log(req.body)

    // Check if tournament with the same name exists
    const existing = await Tournament.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Tournament already exists" });
    }

    const tournament = new Tournament({
      name,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      entryFee,
      prizePool,
      rules,
      status,
    });

    await tournament.save();
    res.status(201).json({ message: "Tournament created successfully", tournament });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Get all tournaments
const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ startDate: 1 }); // sorted by start date
    res.status(200).json(tournaments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { addTournament, getTournaments };
