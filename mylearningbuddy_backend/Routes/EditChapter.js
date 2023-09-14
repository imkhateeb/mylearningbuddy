const express = require("express");
const router = express.Router();
const Notebooks = require('../models/Notebooks');

/**
 * PUT /api/edit-chapter/:notebookId/:chapterId
 * Edit a chapter within a notebook, adding new entries and updating `updatedAt`.
 * Requires notebookId and chapterId in the route parameters.
 */
router.put("/edit-chapter/:notebookId/:chapterId", async (req, res) => {
   const notebookId = req.params.notebookId;
   const chapterId = req.params.chapterId;
   const { chapterName, chapterHeading, public, lastModified, addSharedGroup } = req.body;

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

      // Find the chapter within the notebook's chapters array
      const chapterToEdit = notebook.chapters.id(chapterId);

      if (!chapterToEdit) {
         // Handle the case where the chapter is not found in the notebook
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Chapter not found in the notebook.",
         });
      }

      // Update chapter properties, add new entries, and set `updatedAt`
      chapterToEdit.chapterName = chapterName || chapterToEdit.chapterName;
      chapterToEdit.chapterHeading = chapterHeading || chapterToEdit.chapterHeading;
      chapterToEdit.public = public || chapterToEdit.public;
      chapterToEdit.lastModified = lastModified;

      if ( addSharedGroup ) {
         chapterToEdit.sharedGroup.push(req.body.addSharedGroup)
      }

      
      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Chapter edited successfully!',
      });
   } catch (error) {
      console.error("Error while editing chapter:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while editing chapter!',
      });
   }
});

module.exports = router;
