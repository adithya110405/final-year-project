const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  team_id: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  title: String,
  description: String,
  ppt_path: String,
  report_path: String,
  video_path: String,
  guide_id: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", default: null },
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
