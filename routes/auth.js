const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');


// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post('/',[
  check('email', 'Please include a valid e-mail').isEmail(),
  check('password', 'Password is required').exists()
], 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    // Find registered user by email
    let user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({msg: "Invalid Credentials"});
    }

    // Compare input password to hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({ msg: 'Invalid Credentials'});
    }

    // Get JWT info
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error")
    
  }
});

module.exports = router;
