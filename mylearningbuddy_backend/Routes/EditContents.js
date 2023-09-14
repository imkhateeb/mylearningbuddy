const express = require("express");
const router = express.Router();
const Notebooks = require('../models/Notebooks');

/**
 * PUT /api/edit-content/:notebookId/:chapterId/:contentId
 * Edit a content entry within a chapter of a notebook.
 * Requires notebookId, chapterId, contentId, and request body for content updates.
 */
router.put("/edit-content/:notebookId/:chapterId/:contentId", async (req, res) => {
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

      // Find the content within the chapter's contents array
      const contentToEdit = chapter.contents.id(contentId);

      if (!contentToEdit) {
         // Handle the case where the content is not found in the chapter
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Content not found in the chapter.",
         });
      }

      // Update content properties based on the request body
      contentToEdit.content = req.body.content || contentToEdit.content;
      contentToEdit.contentType = req.body.contentType || contentToEdit.contentType;
      contentToEdit.lastModified = req.body.lastModified || contentToEdit.lastModified;

      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Content edited successfully!',
      });
   } catch (error) {
      console.error("Error while editing content:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while editing content!',
      });
   }
});



/**
 * PUT /api/edit-link/:notebookId/:chapterId/:linkId
 * Edit a link entry within a chapter of a notebook.
 * Requires notebookId, chapterId, linkId, and request body for link updates.
 */
router.put("/edit-link/:notebookId/:chapterId/:linkId", async (req, res) => {
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

      // Find the link within the chapter's links array
      const linkToEdit = chapter.links.id(linkId);

      if (!linkToEdit) {
         // Handle the case where the link is not found in the chapter
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Link not found in the chapter.",
         });
      }

      // Update link properties based on the request body
      linkToEdit.link = req.body.link || linkToEdit.link;
      linkToEdit.linkDescription = req.body.linkDescription || linkToEdit.linkDescription;
      linkToEdit.lastModified = req.body.lastModified || linkToEdit.lastModified;

      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Link edited successfully!',
      });
   } catch (error) {
      console.error("Error while editing link:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while editing link!',
      });
   }
});





/**
 * PUT /api/edit-image/:notebookId/:chapterId/:imageId
 * Edit an image entry within a chapter of a notebook.
 * Requires notebookId, chapterId, imageId, and request body for image updates.
 */
router.put("/edit-image/:notebookId/:chapterId/:imageId", async (req, res) => {
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

      // Find the image within the chapter's images array
      const imageToEdit = chapter.images.id(imageId);

      if (!imageToEdit) {
         // Handle the case where the image is not found in the chapter
         return res.status(404).json({
            success: false,
            status: 404,
            message: "Image not found in the chapter.",
         });
      }

      // Update image properties based on the request body
      imageToEdit.imageDescription = req.body.imageDescription || imageToEdit.imageDescription;
      imageToEdit.lastModified = req.body.lastModified || imageToEdit.lastModified;

      // Save the updated notebook document
      await notebook.save();

      // Respond with success and a message
      res.status(200).json({
         success: true,
         status: 200,
         message: 'Image edited successfully!',
      });
   } catch (error) {
      console.error("Error while editing image:", error);
      // Respond with an error message and status code 500 (Internal Server Error)
      res.status(500).json({
         success: false,
         status: 500,
         message: 'Error while editing image!',
      });
   }
});

module.exports = router;
