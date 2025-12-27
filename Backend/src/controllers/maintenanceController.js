const MaintenanceRequest = require("../models/MaintenanceRequest");
const Equipment = require("../models/Equipment");

// Create Maintenance Request
exports.createRequest = async (req, res) => {
  try {
    const { subject, type, equipment, scheduledDate, description, priority } =
      req.body;

    const equipmentDoc = await Equipment.findById(equipment);
    if (!equipmentDoc)
      return res.status(404).json({ message: "Equipment not found" });

    const request = new MaintenanceRequest({
      subject,
      type,
      equipment,
      category: equipmentDoc.category,
      scheduledDate,
      description,
      priority,
      createdBy: req.user?.id,
    });

    await request.save();
    await request
      .populate("equipment")
      .populate("assignedTeam")
      .populate("assignedTechnician");

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const { status, type, search, equipmentId, startDate, endDate } = req.query;
    let query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (equipmentId) query.equipment = equipmentId;
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      query.scheduledDate = {};
      if (startDate) query.scheduledDate.$gte = new Date(startDate);
      if (endDate) query.scheduledDate.$lte = new Date(endDate);
    }

    const requests = await MaintenanceRequest.find(query)
      .populate("equipment")
      .populate("assignedTeam")
      .populate("assignedTechnician")
      .populate("createdBy")
      .sort({ createdDate: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get request by ID
exports.getRequestById = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id)
      .populate("equipment")
      .populate("assignedTeam")
      .populate("assignedTechnician")
      .populate("createdBy");

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Request
exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    update.updatedAt = Date.now();

    // Check for overdue
    if (update.dueDate) {
      update.isOverdue = new Date(update.dueDate) < new Date();
    }

    const request = await MaintenanceRequest.findByIdAndUpdate(id, update, {
      new: true,
    })
      .populate("equipment")
      .populate("assignedTeam")
      .populate("assignedTechnician")
      .populate("createdBy");

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign request to technician
exports.assignRequest = async (req, res) => {
  try {
    const { assignedTechnician, assignedTeam } = req.body;

    const request = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      {
        assignedTechnician,
        assignedTeam,
        status: "In Progress",
        updatedAt: Date.now(),
      },
      { new: true }
    )
      .populate("equipment")
      .populate("assignedTeam")
      .populate("assignedTechnician");

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete Request
exports.completeRequest = async (req, res) => {
  try {
    const { hoursSpent, notes } = req.body;

    const request = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: "Repaired",
        hoursSpent,
        notes,
        updatedAt: Date.now(),
      },
      { new: true }
    )
      .populate("equipment")
      .populate("assignedTeam")
      .populate("assignedTechnician");

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Scrap Equipment (when request status is Scrap)
exports.scrapEquipment = async (req, res) => {
  try {
    const { notes } = req.body;
    const request = await MaintenanceRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    // Update request status
    request.status = "Scrap";
    request.notes = notes;
    request.updatedAt = Date.now();
    await request.save();

    // Update equipment status
    await Equipment.findByIdAndUpdate(request.equipment, {
      status: "Scrapped",
    });

    await request
      .populate("equipment")
      .populate("assignedTeam")
      .populate("assignedTechnician");
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Request
exports.deleteRequest = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByIdAndDelete(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Request deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalRequests = await MaintenanceRequest.countDocuments();
    const openRequests = await MaintenanceRequest.countDocuments({
      status: { $in: ["New", "In Progress"] },
    });
    const completedRequests = await MaintenanceRequest.countDocuments({
      status: "Repaired",
    });
    const overdueRequests = await MaintenanceRequest.countDocuments({
      isOverdue: true,
    });

    const requestsByStatus = await MaintenanceRequest.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const requestsByType = await MaintenanceRequest.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    res.json({
      totalRequests,
      openRequests,
      completedRequests,
      overdueRequests,
      requestsByStatus,
      requestsByType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
