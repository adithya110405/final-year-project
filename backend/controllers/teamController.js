const Team = require("../models/Team");
const Student = require("../models/Student");

exports.addMember = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, reg_no, email } = req.body;
    if (!name || !reg_no || !email) return res.status(400).json({ message: "Missing fields" });

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    team.members.push({ name, reg_no, email });
    await team.save();

    const studentExists = await Student.findOne({ reg_no });
    if (!studentExists) {
      const newStudent = new Student({ name, reg_no, email, passwordHash: "placeholder" });
      newStudent.team_id = team._id;
      await newStudent.save();
    } else {
      studentExists.team_id = team._id;
      await studentExists.save();
    }

    res.json({ message: "Member added", team });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
