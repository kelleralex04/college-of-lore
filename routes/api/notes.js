const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');

router.post('/campaign/:campaignId/note/:noteTitleId/:noteDateId/:noteContentId', notesCtrl.addCampaignNote);
router.post('/campaign/:sessionNoteId/:noteTitleId/:noteDateId/:noteContentId', notesCtrl.editCampaignNote);
router.post('/subject/:subjectId/note/:noteTitleId/:noteDateId/:noteContentId', notesCtrl.addSubjectNote);
router.post('/subject/:subjectNoteId/:noteTitleId/:noteDateId/:noteContentId', notesCtrl.editSubjectNote);

module.exports = router;