// routes/users.js

const express = require('express');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();
const userModel = require('../models/User');
const validateStringFields = require('../middleware/validateStringFields');

// ==================== GET ALL USERS ====================
userRouter.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// ==================== FIND USER (Login) ====================
userRouter.get('/findUser', async (req, res) => {
  const { f_userName, f_Pwd } = req.query;

  if (!f_userName || !f_Pwd) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await userModel.findOne({ f_userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// ==================== CREATE USER ====================
userRouter.post(
  '/createUser',
  validateStringFields(['f_userName', 'f_Pwd']),
  async (req, res) => {
    const { f_userName, f_Pwd } = req.body;

    try {
      const existingUser = await userModel.findOne({ f_userName });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(f_Pwd, salt);

      const newUser = new userModel({
        f_userName,
        f_Pwd: hashedPassword
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  }
);

module.exports = userRouter;
