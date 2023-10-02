const express = require("express");
const router = express.Router();
const Notebook = require('../models/Notebooks');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * POST /api/:authToken/add-notebook
 * Create a new notebook and associate it with the user.
 * Requires authToken in the request body for user authentication.
 */
router.post("/:authToken/add-notebook", (req, res) => {
    // Destructure request body for notebook properties
    const { notebookName, notebookImportance, public, createdBy, createdAt } = req.body;

    
    const authToken = req.params.authToken;
    const jwtSecret = process.env.REACT_APP_JWT_SECRET;

    // use JWT Token here to extract user Id then put the data;
    jwt.verify(authToken, jwtSecret, async ( err, decodedToken)=>{
        if ( err ) {
            console.log("Token verification error", err);
        } else {
            const userId = decodedToken.user.id;
            try {
                // Create a new notebook
                const newNotebook = new Notebook({
                    notebookName,
                    notebookImportance,
                    public,
                    createdBy,
                    createdAt,
                });
        
                // Save the new notebook to the database
                await newNotebook.save();
        
                // Find the user by authToken and update their notebooks array
                const user = await User.findOne({ _id: userId });
        
                if (!user) {
                    // Handle the case where the user is not found
                    return res.status(404).json({ success: false, message: "User not found." });
                }
        
                // Add the newly created notebook's ID to the user's notebooks array
                user.notebooks.push(newNotebook._id);
        
                // Save the updated user document
                await user.save();
        
                // Respond with success
                res.json({ success: true });
            } catch (error) {
                console.error("Error in adding Notebook:", error);
                // Respond with an error message and status code 500 (Internal Server Error)
                res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        }
    })

    
    
});

module.exports = router;
