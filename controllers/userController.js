const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const register = async (req, res) => {
  const { username, password, name, gender } = req.body;

  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  if (password.length < 6) {
    return res.status(400).send('Password is too short');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, password: hashedPassword, name, gender });

  res.status(201).send('User created successfully');
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).send('Invalid user');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.send({ token });
};

module.exports = { register, login };
