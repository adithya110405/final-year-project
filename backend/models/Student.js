const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reg_no: { type: String, required: true, unique: true },
  class: { type: String },
  section: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  team_id: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
  role: { type: String, default: "student" }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
