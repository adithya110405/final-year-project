import React, { useEffect, useState } from "react";
import API from "../../../backend/services/api";
import { useNavigate, Link } from "react-router-dom";

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDash = async () => {
      try {
        const res = await API.get("/auth/student/dashboard");
        setData(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchDash();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!data) return <div className="p-8">Loading dashboard...</div>;

  const { student, team } = data;

  return (
    <div className="min-h-screen">
      <header className="bg-[#003366] text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Final Year Portal</h1>
          <div className="text-sm">Welcome, {student.name}</div>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/team/${team?._id}/add-member`}
            className="bg-yellow-400 px-3 py-2 rounded text-black"
          >
            Add Member
          </Link>
          <Link
            to={`/project/${team?._id}/upload`}
            className="bg-white text-black px-3 py-2 rounded"
          >
            Project Upload
          </Link>
          <button onClick={logout} className="bg-red-500 px-3 py-2 rounded">
            Logout
          </button>
        </div>
      </header>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Team & Profile</h2>
        <div className="bg-white shadow p-4 rounded mb-4">
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Reg No:</strong> {student.reg_no}
          </p>
          <p>
            <strong>Class/Section:</strong> {student.class} / {student.section}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Team</h3>
        <div className="bg-white shadow p-4 rounded">
          <p>
            <strong>Leader:</strong> {team?.leader_id?.name || "Not assigned"}
          </p>
          <p className="mt-2">
            <strong>Members:</strong>
          </p>
          <ul className="list-disc ml-6">
            {team?.members?.length > 0 ? (
              team.members.map((m, i) => (
                <li key={i}>
                  {m.name} — {m.reg_no} — {m.email}
                </li>
              ))
            ) : (
              <li>No members added</li>
            )}
          </ul>
          <div className="mt-4">
            <Link to="/faculties" className="text-blue-600">
              View Faculties / Select Guide Preferences
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
