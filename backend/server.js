require("dotenv").config();   // ✅ make sure this is the very first line

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ connect to MongoDB using URI from .env
connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/teams", require("./routes/team"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/faculties", require("./routes/faculties"));

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (req, res) => res.send("Final Year Portal Backend is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
