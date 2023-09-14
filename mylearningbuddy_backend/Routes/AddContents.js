const express = require("express");
const router = express.Router();
const Notebooks = require('../models/Notebooks');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/images');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
   },
});
const upload = multer({ storage: storage }).single('file');

/**
 * POST /api/:chapterId/add-contents/:notebookId
 * Add contents to a chapter within a notebook.
 * Requires chapterId, notebookId, and request body for content.
 */
router.post("/:chapterId/add-contents/:notebookId", async (req, res) => {
   // Destructure request body for content properties
   const { content, contentType, createdAt } = req.body;
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

      const chapter = notebook.chapters.find(item => item._id === chapterId);

      if (!chapter) {
         // Handle the case where the chapter is not found in the notebook
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Chapter not found in the notebook.",
         });
      }

      // Create a new content entry
      const newContent = {
         content,
         contentType,
         createdAt,
      };

      chapter.contents.push(newContent);

      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Content added successfully!',
      });
   } catch (error) {
      console.error("Error while adding content:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while adding content!',
      });
   }
});



/**
 * POST /api/:chapterId/add-links/:notebookId
 * Add links to a chapter within a notebook.
 * Requires chapterId, notebookId, and request body for links.
 */
router.post("/:chapterId/add-links/:notebookId", async (req, res) => {
   // Destructure request body for link properties
   const { link, linkDescription, createdAt } = req.body;
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

      const chapter = notebook.chapters.find(item => item._id === chapterId);

      if (!chapter) {
         // Handle the case where the chapter is not found in the notebook
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Chapter not found in the notebook.",
         });
      }

      // Create a new link entry
      const newLink = {
         link,
         linkDescription,
         createdAt,
      };

      chapter.links.push(newLink);

      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Link added successfully!',
      });
   } catch (error) {
      console.error("Error while adding link:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while adding link!',
      });
   }
});


/**
 * POST /api/:chapterId/add-images/:notebookId
 * Add images to a chapter within a notebook.
 * Requires chapterId, notebookId, and image file upload.
 */
router.post("/:chapterId/add-images/:notebookId", upload, async (req, res) => {
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

      const chapter = notebook.chapters.find(item => item._id === chapterId);

      if (!chapter) {
         // Handle the case where the chapter is not found in the notebook
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Chapter not found in the notebook.",
         });
      }

      chapter.images.push({
         image: req.file,
         imageDescription,
         createdAt,
      });

      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Images added successfully!',
      });
   } catch (error) {
      console.error("Error while adding Images:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while adding Images!',
      });
   }
});



module.exports = router;