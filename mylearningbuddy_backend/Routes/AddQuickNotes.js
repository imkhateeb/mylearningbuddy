const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Import the 'jsonwebtoken' library
const User = require('../models/User');
const QuickNote = require('../models/QuickNote'); // Import the QuickNote model

// POST endpoint to add a new Quick Note
router.post("/add-quicknotes/:authToken", async (req, res) => {
   const { public, quicknote, quicknoteTag, quicknoteCreatedDate, createdBy } = req.body;

   const authToken = req.params.authToken;
   const jwtSecret = process.env.REACT_APP_JWT_SECRET;

   // Verify the provided JWT token
   jwt.verify(authToken, jwtSecret, async (err, decodedToken) => {
      if (err) {
         console.log("Token verification error", err);
         return res.status(401).json({ success: false, message: "Invalid token" }); // Return a 401 Unauthorized response for invalid tokens
      }

      const userId = decodedToken.user.id;

      try {
         // Create a new QuickNote document
         const newQuickNote = new QuickNote({
            public,
            quicknote,
            quicknoteTag,
            quicknoteCreatedDate,
            createdBy,
         });

         // Save the new QuickNote to the database
         await newQuickNote.save();

         // Find the user by authToken and update their quickNotes array
         const user = await User.findOne({ _id: userId });

         if (!user) {
            // Handle the case where the user is not found
            return res.status(404).json({ success: false, message: "User not found." });
         }

         // Add the newly created QuickNote's ID to the user's quickNotes array
         user.quickNotes.push(newQuickNote._id);

         // Save the updated user document
         await user.save();

         // Respond with success
         res.json({ success: true });
      } catch (error) {
         console.error("Error in adding Quick notes:", error);
         // Respond with an error message and status code 500 (Internal Server Error)
         res.status(500).json({ success: false, message: "Internal Server Error" });
      }
   });
});

module.exports = router;
