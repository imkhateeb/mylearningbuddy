const mongoose = require('mongoose');
const { Schema } = mongoose;


const linkSchema = new Schema({
   link: String,
   linkDescription: String,
   createdAt: {
      date: String,
      Time: String,
   },
   lastModified: {
      date: String,
      time: String,
   },
});

const contentSchema = new Schema({
   content: String,
   contentType: String,
   createdAt: {
      date: String,
      Time: String,
   },
   lastModified: {
      date: String,
      time: String,
   },
});

const imageSchema = new Schema({
   image: {
      fieldName: String,
      originalName: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number,
   },
   createdAt: {
      date: String,
      Time: String,
   },
   lastModified: {
      date: String,
      time: String,
   },
   imageDescription: String,
});

const chapterSchema = new Schema({
   chapterName: String,
   chapterHeading: String,
   public: Boolean,
   sharedGroup: [{
      groupName: String,
      groupId: String,
   }],
   createdAt: {
      date: String,
      Time: String,
   },
   lastModified: {
      date: String,
      time: String,
   },
   contents: [contentSchema],
   images: [imageSchema],
   links: [linkSchema]
});

const notebookSchema = new Schema({
   notebookName: String,
   notebookImportance: String,
   public: Boolean,
   sharedGroup: [{
      groupName: String,
      groupId: String,
   }],
   chapters: [chapterSchema],
   createdBy: {
      type: Schema.Types.ObjectId,  // Reference to the User model
      ref: 'User',                  // Name of the referenced model
      required: true,
   },
   createdAt: {
      date: String,
      Time: String,
   },
   lastModified: {
      date: String,
      time: String,
   },
});

module.exports = mongoose.model("Notebook", notebookSchema);
