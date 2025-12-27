const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["CNC Machine", "Laptop", "Server", "Printer", "Other"],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  assignedEmployee: {
    type: String,
    trim: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  warrantyExpiration: {
    type: Date,
  },
  location: {
    type: String,
    required: true,
    description: "Physical location of equipment",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Scrapped"],
    default: "Active",
  },
  maintenanceTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaintenanceTeam",
  },
  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Equipment", equipmentSchema);
