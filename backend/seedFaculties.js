// run this once: node src/seedFaculties.js
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");
const Faculty = require("./models/Faculty");

const data = [
  {
    name: "Dr Rekha Hitha Aranha",
    email: "rekha@christuniversity.in",
    department: "CSE-AIML",
    designation: "Associate Professor",
    role: "Guide",
    interests: ["AI", "Machine Learning", "HRM"],
    // image sources from Christ University public pages
    photo: "https://m.christuniversity.in/Business%20and%20Management/faculty-details/MzA2Nw%3D%3D/MzAx"
  },
  {
    name: "Dr Sandeep Kumar",
    email: "sandeep.kumar@christuniversity.in",
    department: "AI, ML and Data Science",
    designation: "Professor",
    role: "Guide",
    interests: ["AI","Deep Learning"],
    photo: "https://m.christuniversity.in/ai%2C-ml-and-data-science/faculty-details/NDg2MA%3D%3D/OTY%3D"
  },
  {
    name: "Dr Mary Jasmine E",
    email: "maryjasmine@christuniversity.in",
    department: "CSE",
    designation: "Assistant Professor",
    role: "Panel",
    interests: ["Software Engineering","Cloud"],
    photo: "https://m.christuniversity.in/dept/faculty-details/ODIxMg%3D%3D/Nzk%3D"
  },
  {
    name: "Dr Jeno (example)",
    email: "jeno@christuniversity.in",
    department: "CSE-AIML",
    designation: "Professor",
    role: "Coordinator",
    interests: ["Algorithms","Data Structures"],
    photo: "https://m.christuniversity.in/COMPUTER%20SCIENCE/faculty-details/NTI2Mw%3D%3D/NjI%3D"
  },
  {
    name: "Dr Mikhal Mosis",
    email: "mikhal@christuniversity.in",
    department: "CSE",
    designation: "Professor",
    role: "Guide",
    interests: ["Deep Learning","AI Ethics"],
    photo: "https://christuniversity.in/dept/faculty-details/NTkzNg%3D%3D/NjI%3D"
  }
];

const seed = async () => {
  await connectDB();
  try {
    await Faculty.deleteMany({});
    await Faculty.insertMany(data);
    console.log("Seeded faculties");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
