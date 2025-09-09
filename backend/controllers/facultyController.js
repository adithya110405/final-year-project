const Faculty = require("../models/Faculty");

exports.createFaculty = async (req, res) => {
  try {
    const { name, email, department, designation, interests, photo, role } = req.body;
    const existing = await Faculty.findOne({ email });
    if (existing) return res.status(400).json({ message: "Faculty exists" });

    const f = new Faculty({ name, email, department, designation, interests, photo, role });
    await f.save();
    res.json({ message: "Faculty created", faculty: f });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listFaculties = async (req, res) => {
  try {
    const { department } = req.query;
    const filter = {};
    if (department) filter.department = department;
    const list = await Faculty.find(filter).lean();
    res.json({ faculties: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
