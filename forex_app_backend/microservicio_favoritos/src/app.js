const express = require('express');
const connectDB = require('./config/database');
const favoriteRoutes = require('./routes/favoritesRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();
app.use(express.json());
app.use('/api', favoriteRoutes);
app.use('/api', authRoutes);

module.exports = app;
