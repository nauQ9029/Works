// routes/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
//token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODUzZDRjMTYwYzkyZjZlMmI1OWRjNDAiLCJpYXQiOjE3NTAzMjQ0MTcsImV4cCI6MTc1MDMyODAxN30.K8RDlrXdo9snkQ0_nevdKDobz6UMbqZptFHf8iy97Rg

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    let user = await userController.findUserByUsername(username);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userController.createUser(username, hashedPassword);

    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', userId: user._id, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userController.findUserByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { _id: user._id };
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

      res.cookie('username', username, { httpOnly: true, maxAge: 3600000 }); // 1 hour
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.get('/logined', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`Welcome ${username}, you are authenticated`);
  } else {
    res.status(401).send('Please login to access this page');
  }
});

userRouter.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.send('Logged out successfully');
});

module.exports = userRouter;
