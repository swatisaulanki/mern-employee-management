const express = require("express");
const EmployeeModel = require("../models/Employee");
const upload = require("../middleware/upload"); // your multer upload middleware
const empRouter = express.Router();

// ==================== CREATE EMPLOYEE ====================

empRouter.post("/createmp", upload.single("f_Image"), async (req, res) => {
  try {
    const { f_Id, ...employeeData } = req.body;  // exclude f_Id

    const newEmployee = new EmployeeModel({
      ...employeeData,
      f_Image: req.file ? req.file.filename : null
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      data: savedEmployee
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating employee",
      error: error.message
    });
  }
});


// ==================== GET ALL EMPLOYEES (with pagination) ====================
empRouter.get("/getemp", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const employees = await EmployeeModel.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await EmployeeModel.countDocuments();

    res.json({
      totalEmployees: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employees",
      error: error.message
    });
  }
});

// ==================== GET SINGLE EMPLOYEE BY ID ====================
empRouter.get("/getsinglemp/:f_id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.f_id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employee",
      error: error.message
    });
  }
});

// ==================== UPDATE EMPLOYEE ====================
empRouter.put("/updatemp/:f_id", upload.single("f_Image"), async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // If a new image is uploaded, update the f_Image field
    if (req.file) {
      updatedData.f_Image = req.file.filename;
    }

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.f_id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee updated successfully",
      data: updatedEmployee
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating employee",
      error: error.message
    });
  }
});

// ==================== DELETE EMPLOYEE ====================
empRouter.delete("/deletemp/:f_id", async (req, res) => {
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.f_id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting employee",
      error: error.message
    });
  }
});

module.exports = empRouter;
