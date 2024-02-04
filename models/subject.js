const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: { type: String, required: true },
    subjectNote: [{
        type: Schema.Types.ObjectId,
        ref: 'Note',
    }],
    link: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Subject', subjectSchema);