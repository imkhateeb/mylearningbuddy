const express = require("express");
const router = express.Router();
const Notebooks = require('../models/Notebooks');

/**
 * DELETE /api/:chapterId/delete-contents/:notebookId/contentId
 * Delete a content from a chapter within a notebook.
 * Requires chapterId, notebookId, and contentId.
 */
router.delete("/:chapterId/delete-contents/:notebookId/:contentId", async (req, res) => {
   const notebookId = req.params.notebookId;
   const chapterId = req.params.chapterId;
   const contentId = req.params.contentId;

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

      const chapter = notebook.chapters.find(item => item._id === chapterId);

      if (!chapter) {
         // Handle the case where the chapter is not found in the notebook
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Chapter not found in the notebook.",
         });
      }

      chapter.contents.remove({ _id: contentId });

      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Content deleted successfully!',
      });
   } catch (error) {
      console.error("Error while deleting content:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while deleting content!',
      });
   }
});



// (Same setup and imports as above)

/**
 * DELETE /api/:chapterId/delete-links/:notebookId/:linkId
 * Delete a link from a chapter within a notebook.
 * Requires chapterId, notebookId, and linkId.
 */
router.delete("/:chapterId/delete-links/:notebookId/:linkId", async (req, res) => {
   const notebookId = req.params.notebookId;
   const chapterId = req.params.chapterId;
   const linkId = req.params.linkId;

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

      const chapter = notebook.chapters.find(item => item._id === chapterId);

      if (!chapter) {
         // Handle the case where the chapter is not found in the notebook
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Chapter not found in the notebook.",
         });
      }

      chapter.links.remove({ _id: linkId });

      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Link deleted successfully!',
      });
   } catch (error) {
      console.error("Error while deleting link:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while deleting link!',
      });
   }
});




/**
 * DELETE /api/:chapterId/delete-images/:notebookId/:imageId
 * Delete an image from a chapter within a notebook.
 * Requires chapterId, notebookId, and imageId.
 */
router.delete("/:chapterId/delete-images/:notebookId/:imageId", async (req, res) => {
   const notebookId = req.params.notebookId;
   const chapterId = req.params.chapterId;
   const imageId = req.params.imageId;

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

      const chapter = notebook.chapters.find(item => item._id === chapterId);

      if (!chapter) {
         // Handle the case where the chapter is not found in the notebook
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Chapter not found in the notebook.",
         });
      }

      const imageObject = chapter.images.find(item => item._id === imageId);

      // Removing file from the disk
      const fileName = imageObject.image.filename;
      const imagePath = path.join(__dirname, '../Uploads/images', fileName);

      // Check if the file exists
      if (!fs.existsSync(imagePath)) {
         return res.status(404).json({ error: 'Image not found' });
      }

      // Delete the file
      fs.unlink(imagePath, (err) => {
         if (err) {
            console.error(`Failed to delete ${fileName}.`);
         } else {
            console.log(`${fileName} deleted successfully.`);
         }
      });

      chapter.images.remove({ _id: imageId });

      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Image deleted successfully!',
      });
   } catch (error) {
      console.error("Error while deleting image:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while deleting image!',
      });
   }
});

module.exports = router;