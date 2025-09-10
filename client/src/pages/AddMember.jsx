import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddMember() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", reg_no: "", email: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/teams/${teamId}/members`, form);
      setMsg("Member added");
      setTimeout(() => navigate("/student/dashboard"), 800);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Failed to add member");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow p-6 rounded w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add Team Member</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
          <input required name="reg_no" placeholder="Registration Number" value={form.reg_no} onChange={handleChange} className="w-full border p-2 rounded" />
          <input required name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Add Member</button>
        </form>
        <p className="mt-3 text-sm text-green-600">{msg}</p>
      </div>
    </div>
  );
}
