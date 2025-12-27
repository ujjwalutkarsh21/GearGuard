const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

router.post("/", maintenanceController.createRequest);
router.get("/", maintenanceController.getAllRequests);
router.get("/:id", maintenanceController.getRequestById);
router.put("/:id", maintenanceController.updateRequest);
router.patch("/:id/assign", maintenanceController.assignRequest);
router.patch("/:id/complete", maintenanceController.completeRequest);
router.patch("/:id/scrap", maintenanceController.scrapEquipment);
router.delete("/:id", maintenanceController.deleteRequest);
router.get("/api/statistics", maintenanceController.getStatistics);

module.exports = router;
