const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  leader_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  members: [{ name: String, reg_no: String, email: String }],
  guide_preferences: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }],
  allocated_guide_id: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", default: null }
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);
