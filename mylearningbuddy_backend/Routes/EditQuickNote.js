const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken'); // Import the 'jsonwebtoken' library
const User = require('../models/User');
const QuickNote = require('../models/QuickNotes'); // Import the QuickNotes model



// PUT endpoint to edit a Quick Note by ID
router.put("/edit-quicknote/:id", async (req, res) => {
        const { quicknote, quicknoteTag, quicknoteCreatedDate } = req.body;
        const quicknoteId = req.params.id;
        
        try {
           // Find the Quick Note by its ID
           const quickNote = await QuickNote.findOne({ _id: quicknoteId });
           
           if (!quickNote) {
              // Handle the case where the Quick Note is not found
              return res.status(404).json({ success: false, message: "Quick Note not found." });
           }
           
           // Update Quick Note properties based on the request body
           quickNote.quicknote = quicknote || quickNote.quicknote;
           quickNote.quicknoteTag = quicknoteTag || quickNote.quicknoteTag;
           quickNote.quicknoteCreatedDate = quicknoteCreatedDate || quickNote.quicknoteCreatedDate;
           
           // Save the updated Quick Note document
           await quickNote.save();
           
           // Respond with success and a message
           res.status(200).json({ success: true, message: 'Quick Note edited successfully!' });
        } catch (error) {
           console.error("Error while editing Quick Note:", error);
           // Respond with an error message and status code 500 (Internal Server Error)
           res.status(500).json({ success: false, message: 'Error while editing Quick Note!' });
        }
     });
     
     module.exports = router;