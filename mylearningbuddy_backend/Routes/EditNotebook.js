const express = require("express");
const router = express.Router();
const Notebooks = require('../models/Notebooks');

/**
 * PUT /api/edit-notebook/:notebookId
 * Edit a notebook, adding new entries and updating `updatedAt`.
 * Requires notebookId in the route parameters.
 */
router.put("/edit-notebook/:notebookId", async (req, res) => {
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

        // Update notebook properties, add new entries, and set `updatedAt`
        notebook.notebookName = req.body.notebookName || notebook.notebookName;
        notebook.notebookImportance = req.body.notebookImportance || notebook.notebookImportance;
        notebook.public = req.body.public || notebook.public;
        notebook.lastModified = req.body.lastModified || notebook.lastModified;
        
        if ( req.body.addSharedGroup ){
                notebook.sharedGroup.push(addSharedGroup);
        }
        // Save the updated notebook document
        await notebook.save();

        // Respond with success and a message
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Notebook edited successfully!',
        });
    } catch (error) {
        console.error("Error while editing notebook:", error);
        // Respond with an error message and status code 500 (Internal Server Error)
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Error while editing notebook!',
        });
    }
});

module.exports = router;
