const express = require("express");
const router = express.Router();
const Notebooks = require('../models/Notebooks');

/**
 * DELETE /api/delete-chapter/:notebookId/:chapterId
 * Delete a chapter from a notebook.
 * Requires notebookId and chapterId in the route parameters.
 */
router.delete("/delete-chapter/:notebookId/:chapterId", async (req, res) => {
    const notebookId = req.params.notebookId;
    const chapterId = req.params.chapterId;

    try {
        // Find the notebook by its ID
        const notebook = await Notebooks.findOne({ _id: notebookId });

        if (!notebook) {
            // Handle the case where the notebook is not found
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Notebook not found.",
            });
        }

        // Find the chapter by its ID in the notebook's chapters array
        const chapterToRemove = notebook.chapters._id(chapterId);

        if (!chapterToRemove) {
            // Handle the case where the chapter is not found in the notebook
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Chapter not found in the notebook.",
            });
        }

        // Remove the chapter from the notebook's chapters array
        await chapterToRemove.remove();

        // Save the updated notebook document
        await notebook.save();

        // Respond with success and a message
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Chapter deleted successfully!',
        });
    } catch (error) {
        console.error("Error while deleting chapter:", error);
        // Respond with an error message and status code 500 (Internal Server Error)
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Error while deleting chapter!',
        });
    }
});

module.exports = router;
