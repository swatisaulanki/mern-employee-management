// models/employee.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EmployeeSchema = new mongoose.Schema({
  f_Image: {
    type: String, // store filename or URL
    required: true
  },
  f_Name: {
    type: String,
    required: true
  },
  f_Email: {
    type: String,
    required: true,
    unique: true
  },
  f_Mobile: {
    type: String,
    required: true
  },
  f_Designation: {
    type: String,
    required: true
  },
  f_gender: {
    type: String,
    required: true
  },
  f_Course: {
    type: String,
    required: true
  },
  f_Createdate: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

// Auto increment ID field
EmployeeSchema.plugin(AutoIncrement, { inc_field: 'f_Id', start_seq: 1 });

const userModel = mongoose.model('Users', UserSchema);

module.exports =  userModel;
