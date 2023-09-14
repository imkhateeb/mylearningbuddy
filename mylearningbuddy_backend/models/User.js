const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    notebooks: [{
        type: ObjectId,
        ref: 'Notebook', // Reference to the Notebook model
    }],
    quickNotes: [{
        type: ObjectId,
        ref: 'QuickNote', // Reference to the QuickNote model
    }],
});

module.exports = mongoose.model("User", userSchema);
