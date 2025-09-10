import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#003366] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/logo192.png" alt="logo" className="h-10" />
          <div>
            <h1 className="text-lg font-bold">Christ University</h1>
            <div className="text-sm">Final Year Project Portal</div>
          </div>
        </div>
        <div>
          <Link to="/login" className="bg-yellow-400 px-4 py-2 rounded text-black">Login</Link>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 p-4">
          <h3 className="font-semibold mb-3">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li>e-Services</li>
            <li>Academics</li>
            <li>Student Life</li>
            <li className="text-blue-700 font-bold">Final Year Project Portal</li>
          </ul>
        </aside>

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Project Review Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 h-48 flex items-center justify-center">Video Placeholder 🎥</div>
            <div className="bg-gray-200 h-48 flex items-center justify-center">Image Placeholder 🖼️</div>
          </div>
        </main>
      </div>
    </div>
  );
}
