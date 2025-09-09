const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Team = require("../models/Team");

exports.registerStudent = async (req, res) => {
  try {
    const { name, reg_no, class: cls, section, email, password } = req.body;
    if (!name || !reg_no || !email || !password) return res.status(400).json({ message: "Provide required fields" });

    const existing = await Student.findOne({ $or: [{ email }, { reg_no }] });
    if (existing) return res.status(400).json({ message: "Student exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const student = new Student({ name, reg_no, class: cls, section, email, passwordHash });
    await student.save();

    const team = new Team({ leader_id: student._id, members: [] });
    await team.save();

    student.team_id = team._id;
    await student.save();

    const token = jwt.sign({ id: student._id, email: student.email, role: student.role }, process.env.JWT_SECRET, { expiresIn: "8h" });

    res.json({ message: "Registered", token, student: { id: student._id, name: student.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id, email: student.email, role: student.role }, process.env.JWT_SECRET, { expiresIn: "8h" });

    res.json({ message: "Login success", token, student: { id: student._id, name: student.name, reg_no: student.reg_no, team_id: student.team_id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId).select("-passwordHash").lean();
    if (!student) return res.status(404).json({ message: "Student not found" });

    const TeamModel = require("../models/Team");
    const team = await TeamModel.findById(student.team_id).populate("leader_id", "name reg_no email").populate("allocated_guide_id", "name email").lean();

    res.json({ student, team });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
