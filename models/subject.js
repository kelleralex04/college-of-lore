const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    note: [String],
    link: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);