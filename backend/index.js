const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const empRouter = require("./routes/employeeRoutes");
const userRouter = require("./routes/userRoutes");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files from absolute path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/employee", empRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send(`
    <h1>👋 Welcome to the Employee Management API! 🏢</h1>
    <p>📋 Manage your team with ease — CRUD operations are all set! 🚀</p>
  `);
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`✅ Server running on port ${PORT}`);
    console.log("✅ Connected to the DB");
  } catch (err) {
    console.error("❌ Error connecting to the DB", err);
  }
});
