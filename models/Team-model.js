const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  ign: { type: String, required: true, trim: true }, // In-Game Name
  uid: { type: String, required: true, trim: true }, // BGMI or Game UID
  instagram: { type: String, trim: true }, // Optional
});

const teamSchema = new mongoose.Schema(
  {
    // Basic Info
    team_name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Consider removing if multiple tournaments share names
    },
    userid: {
      type: String,
      required: true,
      trim: true,
    },
    leader_name: {
      type: String,
      required: true,
      trim: true,
    },
    leader_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contact_number: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "Contact number must be 10 digits"], // basic validation
    },

    // Tournament Info
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    tournament_name: {
      type: String,
      trim: true,
      default: "WarSky Esports Cup - Season 1",
    },

    // Members Array (max 5)
    members: {
      type: [memberSchema],
      validate: {
        validator: function (val) {
          return val.length > 0 && val.length <= 5;
        },
        message: "Team must have between 1 and 5 members",
      },
    },

    // Payment / Entry Info
    entry_fee_paid: {
      type: Boolean,
      default: false,
    },
    utr_number: {
      type: String,
      trim: true,
    },

    // Leaderboard / Match Stats
    kills: { type: Number, default: 0, min: 0 },
    placement_points: { type: Number, default: 0, min: 0 },
    total_points: { type: Number, default: 0 },
    matches_played: { type: Number, default: 0, min: 0 },
    last_played_round: { type: String, default: "Round 1", trim: true },
    rank: { type: Number, default: null },
  },
  { timestamps: true }
);

// ✅ Auto-update total points before save
teamSchema.pre("save", function (next) {
  this.total_points = this.kills + this.placement_points;
  next();
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
