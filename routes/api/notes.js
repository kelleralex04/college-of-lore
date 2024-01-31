const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');

router.post('/:campaignId/note/:noteTitleId/:noteDateId/:noteContentId', notesCtrl.addCampaignNote);

module.exports = router;