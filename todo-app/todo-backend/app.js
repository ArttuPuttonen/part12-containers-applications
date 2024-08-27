const express = require('express');
const mongoose = require('mongoose'); // Import mongoose for MongoDB
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const statisticsRouter = require('./routes/statistics');

const app = express();

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://root:example@localhost:3456/the_database'; // Default fallback
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Routes setup
app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/statistics', statisticsRouter);

module.exports = app;
