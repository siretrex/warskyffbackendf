const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  { 
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      trim: true,
      required: true,
    },
    endTime: {
      type: String,
      trim: true,
      required: true,
    },
    entryFee: {
      type: String,
      default: "Free",
    },
    prizePool: {
      type: String,
      required: true,
    },
    rules: {
      type: [String],
      default: [], 
    },
    status: {
      type: String,
      enum: ["Upcoming", "Running", "Completed"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
