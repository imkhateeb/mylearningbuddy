const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Define a route for creating a user (POST /api/createuser)
router.post("/create-user", async (req, res) => {
    try {
        // Generate a salt and hash the user's password
        const salt = await bcrypt.genSalt(10); // The salt rounds determine the hashing complexity
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new User instance with data from the request body
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword, // Store the hashed password in the database
        });

        // Save the new user to the database
        await newUser.save();


        // Generate a JWT token if the user is authorized
        const jwtSecret = process.env.REACT_APP_JWT_SECRET; // Use the JWT secret from environment variables
        const token = jwt.sign({ user: { id: newUser._id } }, jwtSecret);

        // Respond with a success JSON object
        res.json({
            success: true,
            token: token,
        });

    } catch (error) {
        // If an error occurs during user creation, log the error and respond with a failure JSON object
        console.error("Error creating user:", error);
        res.json({ 
            success: false,
            token: "",
        });
    }
});

module.exports = router;