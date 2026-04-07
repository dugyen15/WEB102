const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Import mock data
const data = require('./data'); // Make sure data.js exists with your mock data

// Routes
app.get('/', (req, res) => {
  res.send('Social Media API is running...');
});

// Get all users
app.get('/users', (req, res) => {
  res.json(data.users);
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
  const user = data.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Get all posts
app.get('/posts', (req, res) => {
  res.json(data.posts);
});

// Get a single post by ID
app.get('/posts/:id', (req, res) => {
  const post = data.posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// Get all comments
app.get('/comments', (req, res) => {
  res.json(data.comments);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT=3000}`);
});