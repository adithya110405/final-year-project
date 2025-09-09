const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const teamController = require("../controllers/teamController");

router.post("/:teamId/members", auth, teamController.addMember);

module.exports = router;
