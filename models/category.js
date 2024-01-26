const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    subject: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }],
    name: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);