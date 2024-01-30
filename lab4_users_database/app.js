
// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const User = require('./models/User');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://GouravChamaria:1234@cluster0.wdagdjh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// Read usersData.json
const userData = JSON.parse(fs.readFileSync('UsersData.json', 'utf8'));

// POST API to insert user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST API to insert test data from usersData.json
app.post('/insertTestData', async (req, res) => {
  try {
    await User.insertMany(userData);
    res.status(201).json({ message: 'Test data inserted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
