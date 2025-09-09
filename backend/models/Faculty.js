const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  department: String,
  designation: String,
  role: { type: String, default: "guide" },
  interests: [String],
  photo: String
}, { timestamps: true });

module.exports = mongoose.model("Faculty", facultySchema);
