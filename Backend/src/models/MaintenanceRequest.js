const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["Corrective", "Preventive"],
    required: true,
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
    required: true,
  },
  category: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Repaired", "Scrap"],
    default: "New",
  },
  scheduledDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  assignedTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaintenanceTeam",
  },
  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  duration: {
    type: Number,
    description: "Duration in hours",
  },
  hoursSpent: {
    type: Number,
    default: 0,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },
  description: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  isOverdue: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
