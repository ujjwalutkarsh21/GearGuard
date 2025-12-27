const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.post("/", teamController.createTeam);
router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamById);
router.put("/:id", teamController.updateTeam);
router.patch("/:id/add-member", teamController.addMember);
router.patch("/:id/remove-member", teamController.removeMember);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
