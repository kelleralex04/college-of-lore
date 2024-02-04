const Campaign = require('../../models/campaign');
const Subject = require('../../models/subject');
const Note = require('../../models/note');

module.exports = {
    addCampaignNote,
    editCampaignNote,
    addSubjectNote,
    editSubjectNote,
    deleteSessionNote,
    deleteSubjectNote,
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

async function addSubjectNote(req, res) {
    const subject = await Subject.findById(req.params.subjectId).populate('subjectNote');
    const note = await Note.create({title: req.params.noteTitleId, date: req.params.noteDateId, content: req.params.noteContentId.replaceAll('<br>', '\n')})
    subject.subjectNote.push(note)
    subject.save()
    res.json(subject);
}

async function editSubjectNote(req, res) {
    await Note.updateOne(
        { _id: req.params.subjectNoteId },
        {$set: {title: req.params.noteTitleId, date: req.params.noteDateId, content: req.params.noteContentId.replaceAll('<br>', '\n')}}
    )
    const note = await Note.findById(req.params.subjectNoteId)
    res.json(note);
}

async function deleteSessionNote(req, res) {
    await Note.deleteOne({_id: req.params.sessionNoteId});
    let campaign = await Campaign.findById(req.params.campaignId)
    const noteIdx = campaign.sessionNote.indexOf(req.params.sessionNoteId)
    campaign.sessionNote.splice(noteIdx, 1)
    campaign.save()
    const user = req.user._id
    res.json(user);
}

async function deleteSubjectNote(req, res) {
    await Note.deleteOne({_id: req.params.subjectNoteId});
    let subject = await Subject.findById(req.params.subjectId)
    const noteIdx = subject.subjectNote.indexOf(req.params.subjectNoteId)
    subject.subjectNote.splice(noteIdx, 1)
    subject.save()
    res.json(subject);
}