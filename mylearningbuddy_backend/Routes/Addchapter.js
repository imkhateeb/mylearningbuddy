const express = require("express");
const router = express.Router();
const Notebooks = require('../models/Notebooks');

/**
 * POST /api/add-chapter/:notebookId
 * Add a new chapter to a notebook.
 * Requires notebookId in the route parameter.
 */
router.post("/add-chapter/:notebookId", async (req, res) => {
    // Destructure request body for chapter properties
    const { chapterName, chapterHeading, public, createdAt } = req.body;
    const notebookId = req.params.notebookId;

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

        // Create a new chapter
        const newChapter = {
            chapterName,
            chapterHeading,
            public,
            createdAt,
        };

        // Add the new chapter to the notebook's chapters array
        notebook.chapters.push(newChapter);

        // Save the updated notebook document
        await notebook.save();

        // Respond with success and a message
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Chapter created successfully!',
        });
    } catch (error) {
        console.error("Error while adding chapter:", error);
        // Respond with an error message and status code 500 (Internal Server Error)
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Error while adding chapter!',
        });
    }
});

module.exports = router;
