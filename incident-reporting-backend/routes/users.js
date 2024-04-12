const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');

router.post('/signup', async(req, res, next)=> {
  const { username, password } = req.body;
  try {
    // Create a new user
    const user = new User({ username });
    const newUser = await User.register( user, password );
    console.log(newUser);
    passport.authenticate("local") (req, res, ()=> {
      res.status(200).json({ message: 'Registration successful', user: req.user });
  });
  } catch(error) {
    if (error.name === 'UserExistsError') {
        return res.status(409).send('User already exists')
    }
    console.error(error);
    res.status(500).send('Registration failed')
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful', user: req.user });
});

// Handle logout
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
