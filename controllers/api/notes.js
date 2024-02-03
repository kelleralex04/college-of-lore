const Campaign = require('../../models/campaign');
const Note = require('../../models/note');

module.exports = {
    addCampaignNote,
    editCampaignNote,
};


async function addCampaignNote(req, res) {
    const campaign = await Campaign.findById(req.params.campaignId).populate('category').populate('sessionNote');
    const note = await Note.create({title: req.params.noteTitleId, date: req.params.noteDateId, content: req.params.noteContentId.replaceAll('<br>', '\n')})
    campaign.sessionNote.push(note)
    campaign.save()
    res.json(campaign);
}

async function editCampaignNote(req, res) {
    await Note.updateOne(
        { _id: req.params.sessionNoteId },
        {$set: {title: req.params.noteTitleId, date: req.params.noteDateId, content: req.params.noteContentId.replaceAll('<br>', '\n')}}
    )
    const note = await Note.findById(req.params.sessionNoteId)
    res.json(note);
}