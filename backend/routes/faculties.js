const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");

router.post("/create", facultyController.createFaculty);
router.get("/", facultyController.listFaculties);

module.exports = router;
