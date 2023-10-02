const express = require("express");
const router = express.Router();
const Notebook = require('../models/Notebooks');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * DELETE /api/:authToken/delete-notebook/:notebookId
 * Delete a notebook associated with the user.
 * Requires authToken for user authentication and notebookId for identification.
 */
router.delete("/:authToken/delete-notebook/:notebookId", async (req, res) => {
  const authToken = req.params.authToken;
  const notebookId = req.params.notebookId;
  const jwtSecret = process.env.REACT_APP_JWT_SECRET;

  // Verify the authToken using JWT
  jwt.verify(authToken, jwtSecret, async (err, decodedToken) => {
    if (err) {
      console.log("Token verification error", err);
      // Respond with an error message and status code 401 (Unauthorized)
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Unauthorized access. Token verification failed.",
      });
    }

    // Extract the user ID from the decoded token
    const userId = decodedToken.user.id;

    try {
      // Find the user by their ID
      const user = await User.findOne({ _id: userId });

      if (!user) {
        // Handle the case where the user is not found
        return res.status(404).json({
          success: false,
          status: 404,
          message: "User not found.",
        });
      }

      // Remove the notebook ID from the user's notebooks array
      user.notebooks.remove(notebookId);

      // Find and remove the notebook from the database
      const notebook = await Notebook.findOne({ _id: notebookId });

      if (!notebook) {
        // Handle the case where the notebook is not found
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Notebook not found.",
        });
      }

      await notebook.remove(); // Remove the notebook

      // Save the updated user document
      await user.save();

      // Respond with success and a status code of 200 (OK)
      res.status(200).json({
        success: true,
        status: 200,
        message: 'Notebook deleted successfully!',
      });
    } catch (error) {
      console.error("Error while deleting notebook", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
        success: false,
        status: 500,
        message: 'Error while deleting notebook.',
      });
    }
  });
});

module.exports = router;
