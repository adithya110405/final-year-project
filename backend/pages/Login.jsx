import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("Logging in...");
    try {
      const res = await API.post("/auth/login/student", form);
      const { token } = res.data;
      localStorage.setItem("token", token);
      setMsg("Logged in");
      navigate("/student/dashboard");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Student Login</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
          <input required type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
        <p className="mt-3 text-sm">
          New? <Link to="/register-student" className="text-blue-600">Register as Team Leader</Link>
        </p>
        <p className="mt-3 text-sm text-red-600">{msg}</p>
      </div>
    </div>
  );
}
