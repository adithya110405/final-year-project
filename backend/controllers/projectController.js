const Project = require("../models/Project");
const Team = require("../models/Team");

exports.createProject = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });
    const project = new Project({ team_id: teamId, title, description });
    await project.save();

    const team = await Team.findById(teamId);
    team.project_id = project._id;
    await team.save();

    res.json({ message: "Project created", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.uploadFiles = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (req.files["ppt"]) project.ppt_path = req.files["ppt"][0].path;
    if (req.files["report"]) project.report_path = req.files["report"][0].path;
    if (req.files["video"]) project.video_path = req.files["video"][0].path;

    await project.save();
    res.json({ message: "Files uploaded", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
