// routes/user.js

const express = require('express');
const userRouter = express.Router();
const validateStringFields = require('../middleware/validateStringFields');
const userModel = require('../models/User');

//  Get all users
userRouter.get('/getUsers', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//   Get user
userRouter.get('/findUser', async (req, res) => {
  const {f_userName,f_Pwd} = req.query;
  try {
    const user = await userModel.findOne({ f_userName });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    else if(user.f_Pwd === f_Pwd){
      res.json(user);
    }
    else {
      res.status(404).json({msg:"Wrong Password"})
    }
    
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add a new user
userRouter.post('/createUser', validateStringFields(['f_userName', 'f_Pwd']), async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  try {
    const newUser = new userModel({
      f_userName,
      f_Pwd
    });
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = userRouter;
