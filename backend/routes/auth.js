const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register/student", authController.registerStudent);
router.post("/login/student", authController.loginStudent);
router.get("/student/dashboard", require("../middleware/auth"), authController.getStudentDashboard);

module.exports = router;
