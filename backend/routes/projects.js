const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const projectController = require("../controllers/projectController");
const upload = require("../utils/multerConfig");

router.post("/create/:teamId", auth, projectController.createProject);

router.post("/upload/:projectId", auth, upload.fields([
  { name: "ppt", maxCount: 1 },
  { name: "report", maxCount: 1 },
  { name: "video", maxCount: 1 }
]), projectController.uploadFiles);

module.exports = router;
