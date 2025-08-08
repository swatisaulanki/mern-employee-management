const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const empRouter = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Mount employee router at /api/employee
app.use("/api/employee", empRouter);

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
    console.log(`Server running on port ${PORT}`);
    console.log("Connected to the DB");
  } catch (err) {
    console.error("Error connecting to the DB", err);
  }
});
