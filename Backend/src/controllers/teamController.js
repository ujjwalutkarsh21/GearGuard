const MaintenanceTeam = require("../models/MaintenanceTeam");

// Create Team
exports.createTeam = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const team = new MaintenanceTeam({
      name,
      description,
      members,
    });

    await team.save();
    await team.populate("members");

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await MaintenanceTeam.find().populate("members");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await MaintenanceTeam.findById(req.params.id).populate(
      "members"
    );

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Team
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    update.updatedAt = Date.now();

    const team = await MaintenanceTeam.findByIdAndUpdate(id, update, {
      new: true,
    }).populate("members");

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add member to team
exports.addMember = async (req, res) => {
  try {
    const { memberId } = req.body;

    const team = await MaintenanceTeam.findByIdAndUpdate(
      req.params.id,
      { $push: { members: memberId }, updatedAt: Date.now() },
      { new: true }
    ).populate("members");

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove member from team
exports.removeMember = async (req, res) => {
  try {
    const { memberId } = req.body;

    const team = await MaintenanceTeam.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: memberId }, updatedAt: Date.now() },
      { new: true }
    ).populate("members");

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await MaintenanceTeam.findByIdAndDelete(req.params.id);

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json({ message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
