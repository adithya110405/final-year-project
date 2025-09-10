import React from "react";
import "./index.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterStudent from "./pages/RegisterStudent";

function App() {
  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    //   <h1 className="text-4xl font-bold text-blue-800 mb-4">
    //     Christ University Portal
    //   </h1>
    //   <p className="text-lg text-gray-700">
    //     Welcome to the React + Tailwind setup!
    //   </p>
    //   <button className="mt-6 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
    //     Get Started
    //   </button>
    // </div>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-student" element={<RegisterStudent />} />
      {/* Add other routes */}
    </Routes>
  );
}

export default App;
