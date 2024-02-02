const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
    },
    date: String,
    content: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);