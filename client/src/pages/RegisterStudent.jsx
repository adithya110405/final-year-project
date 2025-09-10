import React, { useState } from "react";
import API from "../../../backend/services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterStudent() {
  const [form, setForm] = useState({
    name: "",
    reg_no: "",
    class: "",
    section: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("Registering...");
    try {
      const res = await API.post("/auth/register/student", form);
      const { token } = res.data;
      localStorage.setItem("token", token);
      setMsg("Registered!");
      navigate("/student/dashboard");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Student Register (Team Leader)
        </h2>
        <form onSubmit={submit} className="space-y-3">
          <input
            required
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            required
            name="reg_no"
            placeholder="Registration Number"
            value={form.reg_no}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="class"
            placeholder="Class"
            value={form.class}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="section"
            placeholder="Section"
            value={form.section}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Register
          </button>
        </form>
        <p className="mt-3 text-sm text-red-600">{msg}</p>
      </div>
    </div>
  );
}
