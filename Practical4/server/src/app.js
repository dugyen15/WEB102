const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/videos', commentRoutes);

module.exports = app;