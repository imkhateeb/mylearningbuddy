const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Route to authorize a user and return a JWT token
router.get('/auth-user', async (req, res) => {
  try {
    // Find a user by their username or email
    let user = await User.findOne({ $or: [{ username: req.body.userauth }, { email: req.body.userauth }] });

    if (!user) {
      // If no user is found, respond with a 404 status and no token
      return res.json({
        success: false,
        status: 404,
        token: "",
      });
    } else {
      // Compare the provided password with the user's hashed password
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);

      if (!passwordMatch) {
        // If the passwords do not match, respond with a 401 status and no token
        return res.json({
          success: false,
          status: 401,
          token: "",
        });
      } else {
        // Generate a JWT token if the user is authorized
        const jwtSecret = process.env.REACT_APP_JWT_SECRET; // Use the JWT secret from environment variables
        const token = jwt.sign({ user: { id: user._id } }, jwtSecret);

        // Respond with a success status (200) and the generated token
        return res.json({
          success: true,
          status: 200,
          token: token,
        });
      }
    }
  } catch (error) {
    // Handle errors and respond with a 500 status and no token
    console.error('Error during user authorization:', error);
    return res.json({
      success: false,
      status: 500,
      token: "",
    });
  }
});

module.exports = router;
