const Campaign = require('../../models/campaign');
const Note = require('../../models/note');

module.exports = {
    addCampaignNote,
};


async function addCampaignNote(req, res) {
    const campaign = await Campaign.findOne({ user: req.user._id, name: req.params.campaignId }).populate('category').populate('sessionNote');
    const note = await Note.create({title: req.params.noteTitleId, date: req.params.noteDateId, content: req.params.noteContentId.replaceAll('<br>', '\n')})
    campaign.sessionNote.push(note)
    campaign.save()
    res.json(campaign);
}