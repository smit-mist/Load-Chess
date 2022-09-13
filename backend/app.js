const express = require('express');

const app = express();

const puzzleRouter = require('./routes/puzzleRoutes');
app.use('/api/v1', puzzleRouter)
module.exports = app;
