const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const quicknoteSchema = new Schema({
    public: Boolean,
    sharedGroup: [{
        groupName: String,
        groupId: String,
    }],
    quicknote: String,
    quicknoteTag: String,
    quicknoteModifiedDate: {
        Date: String,
        Time: String,
    },
    quicknoteCreatedDate: {
        Date: String,
        Time: String,
    },
    createdBy: {
        type: ObjectId, // Reference to the User model
        ref: 'User',    // Name of the referenced model
        required: true,
    },
});

module.exports = mongoose.model("QuickNote", quicknoteSchema);
