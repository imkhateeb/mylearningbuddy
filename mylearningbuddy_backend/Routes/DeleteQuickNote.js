const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Import the 'jsonwebtoken' library
const User = require('../models/User');
const QuickNote = require('../models/QuickNotes'); // Import the QuickNotes model


// DELETE endpoint to delete a Quick Note by ID
router.delete("/delete-quicknote/:quicknoteId", async (req, res) => {
   const quicknoteId = req.params.quicknoteId;

   try {
      // Find the Quick Note by its ID
      const quickNote = await QuickNote.findOne({ _id: quicknoteId });

      if (!quickNote) {
         // Handle the case where the Quick Note is not found
         return res.status(404).json({ success: false, message: "Quick Note not found." });
      }

      // Delete the Quick Note from the database
      await quickNote.remove();

      // Respond with success and a message
      res.status(200).json({ success: true, message: 'Quick Note deleted successfully!' });
   } catch (error) {
      console.error("Error while deleting Quick Note:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({ success: false, message: 'Error while deleting Quick Note!' });
   }
});

module.exports = router;