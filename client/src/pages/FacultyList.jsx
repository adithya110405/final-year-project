import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function FacultyList() {
  const [fac, setFac] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/faculties");
        setFac(res.data.faculties);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-xl font-bold mb-4">Faculty Directory</h2>
      <div className="grid grid-cols-2 gap-4">
        {fac.map((f) => (
          <div key={f._id} className="bg-white shadow p-4 rounded flex gap-4">
            <img src={f.photo} alt={f.name} className="w-20 h-20 object-cover rounded" />
            <div>
              <p className="font-semibold">{f.name}</p>
              <p className="text-sm">{f.department} — {f.designation}</p>
              <p className="text-xs mt-2">Interests: {f.interests?.join(", ")}</p>
              <p className="text-xs mt-1">Role: {f.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
