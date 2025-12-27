const mongoose = require("mongoose");

const maintenanceTeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Mechanics", "Electricians", "IT Support", "Other"],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MaintenanceTeam", maintenanceTeamSchema);
