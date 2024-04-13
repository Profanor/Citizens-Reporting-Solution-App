const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');
const Incident = require('../models/incidents');

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    // Create a new user
    const user = new User({ username });
    const newUser = await User.register(user, password);
    console.log(newUser);
    // Log in the new user after successful registration
    req.login(newUser, err => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: 'Registration successful', user: req.user });
    });
  } catch (error) {
    if (error.name === 'UserExistsError') {
      return res.status(409).send('User already exists');
    }
    console.error(error);
    res.status(500).send('Registration failed');
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful', user: req.user });
});

router.post('/incident', async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Title, description, and category are required fields' });
    }

    // Create new incident object
    const newIncident = new Incident({
      title,
      description,
      category,
      image // Assuming image is a URL or file path
    });

    // Save incident to database
    await newIncident.save();

    // Send response
    res.status(201).json({ message: 'Incident reported successfully', incident: newIncident });
  } catch (error) {
    console.error('Error reporting incident:', error);
    res.status(500).json({ error: 'Failed to report incident' });
  }
});


// Handle logout
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
