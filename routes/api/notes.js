const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');

router.post('/:campaignId/note/:noteTitleId/:noteDateId/:noteContentId', notesCtrl.addCampaignNote);
router.post('/:sessionNoteId/:noteTitleId/:noteDateId/:noteContentId', notesCtrl.editCampaignNote);

module.exports = router;