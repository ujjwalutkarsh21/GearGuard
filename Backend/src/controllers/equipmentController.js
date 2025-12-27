const Equipment = require("../models/Equipment");
const MaintenanceRequest = require("../models/MaintenanceRequest");

// Create Equipment
exports.createEquipment = async (req, res) => {
  try {
    const {
      name,
      serialNumber,
      category,
      department,
      assignedEmployee,
      purchaseDate,
      warrantyExpiration,
      location,
      maintenanceTeam,
    } = req.body;

    const equipment = new Equipment({
      name,
      serialNumber,
      category,
      department,
      assignedEmployee,
      purchaseDate,
      warrantyExpiration,
      location,
      maintenanceTeam,
    });

    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Equipment
exports.getAllEquipment = async (req, res) => {
  try {
    const { department, category, search } = req.query;
    let query = {};

    if (department) query.department = department;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { serialNumber: { $regex: search, $options: "i" } },
      ];
    }

    const equipment = await Equipment.find(query)
      .populate("maintenanceTeam")
      .populate("assignedTechnician");
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Equipment by ID
exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate("maintenanceTeam")
      .populate("assignedTechnician");

    if (!equipment)
      return res.status(404).json({ message: "Equipment not found" });

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Equipment
exports.updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    update.updatedAt = Date.now();

    const equipment = await Equipment.findByIdAndUpdate(id, update, {
      new: true,
    })
      .populate("maintenanceTeam")
      .populate("assignedTechnician");

    if (!equipment)
      return res.status(404).json({ message: "Equipment not found" });

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Equipment
exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);

    if (!equipment)
      return res.status(404).json({ message: "Equipment not found" });

    res.json({ message: "Equipment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get maintenance requests for specific equipment
exports.getEquipmentRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find({ equipment: req.params.id })
      .populate("equipment")
      .populate("assignedTeam")
      .populate("assignedTechnician");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
