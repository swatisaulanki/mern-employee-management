const mongoose = require("mongoose");

const validateEmail = require("../util/validateEmail");
const validateImage = require("../util/validateImage");
const validateMobile = require("../util/validateMobile");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const employeeSchema = new mongoose.Schema({
  f_Id: {
     type: Number, // Will be auto-generated
      required: true, 
      unique: true 
    },
  f_Image:
   { type: String,
     required: false,
     validate: [validateImage, "Image must be a jpg, jpeg, or png file"]

     },
  f_Name: {
     type: String,
      required: true
     },
  f_Email: { 
    type: String,
     required: true, 
     unique: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  f_Mobile: { 
    type: String, 
    required: true,
    validate: [validateMobile, 'Mobile number must be a 10 numeric digits']
  },
  f_Designation: { 
    type: String, 
    required: true,
    enum: ['HR', 'Manager', 'Sales', 'MERN Developer'] 
  },
  f_Gender: { 
    type: String, 
    required: true,
    enum: ['Male', 'Female'] 
  },
  f_Course: { 
    type: String,
     required: true,
    enum: ['MCA', 'BCA', 'BTech']
  },
  f_Createdate: {
     type: Date, 
     default: Date.now }
});
// 🔹 Apply AutoIncrement Plugin
employeeSchema.plugin(AutoIncrement, {
  id: "employee_seq", // sequence name in MongoDB
  inc_field: "f_Id",  // field to increment
  start_seq: 1000     // optional starting value
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);
module.exports = EmployeeModel;
