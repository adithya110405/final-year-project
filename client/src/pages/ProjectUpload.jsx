import React, { useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function ProjectUpload() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [files, setFiles] = useState({ ppt: null, report: null, video: null });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const createProject = async () => {
    const res = await API.post(`/projects/create/${teamId}`, { title: form.title, description: form.description });
    return res.data.project;
  };

  const uploadFiles = async (projectId) => {
    const fd = new FormData();
    if (files.ppt) fd.append("ppt", files.ppt);
    if (files.report) fd.append("report", files.report);
    if (files.video) fd.append("video", files.video);
    await API.post(`/projects/upload/${projectId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setMsg("Creating project...");
      const project = await createProject();
      setMsg("Uploading files...");
      await uploadFiles(project._id);
      setMsg("Project uploaded");
      setTimeout(() => navigate("/student/dashboard"), 800);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow p-6 rounded w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Create Project & Upload Files</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required name="title" placeholder="Project Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
          <textarea name="description" placeholder="Project Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
          <div>
            <label className="block mb-1">PPT</label>
            <input type="file" name="ppt" onChange={handleFile} />
          </div>
          <div>
            <label className="block mb-1">Report</label>
            <input type="file" name="report" onChange={handleFile} />
          </div>
          <div>
            <label className="block mb-1">Demo Video (optional)</label>
            <input type="file" name="video" onChange={handleFile} />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Create & Upload</button>
        </form>
        <p className="mt-3 text-sm text-green-600">{msg}</p>
      </div>
    </div>
  );
}
