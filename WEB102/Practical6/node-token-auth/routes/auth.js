const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// In-memory user store (no database needed for this demo)
const users = [];

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Email, password, and name are required.' });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  // Hash the password before storing it (never store plain text!)
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    name,
  };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully!' });
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Find user by email
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Compare the provided password with the stored hash
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Create a JWT token with user info as the payload
  const token = jwt.sign(
    { id: user.id, email: user.email },  // payload
    process.env.JWT_SECRET,              // secret key
    { expiresIn: '1d' }                  // token expires in 1 day
  );

  res.json({ message: 'Login successful!', token });
});

// GET /users - returns all users without passwords
router.get('/users', (req, res) => {
  const safeUsers = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
  }));
  res.json(safeUsers);
});

module.exports = router;