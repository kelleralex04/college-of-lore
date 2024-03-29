const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
    sessionNote: [{
        type: Schema.Types.ObjectId,
        ref: 'Note',
    }],
    name: { type: String, required: true },
    description: String,
    image: [{
        name: String,
        imageId: String
    }],
}, {
    timestamps: true
});

campaignSchema.statics.getCampaignList = function(userId) {
    return this.find({ user: userId });
}

module.exports = mongoose.model('Campaign', campaignSchema);