// models/user.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
  f_userName: {
    type: String,
    required: true
  },
  f_Pwd: {
    type: String,
    required: true
  }
});

// Add auto-incrementing field
UserSchema.plugin(AutoIncrement, { inc_field: 'f_sno', start_seq: 0 });

const userModel = mongoose.model('Users', UserSchema);

module.exports =  userModel;
