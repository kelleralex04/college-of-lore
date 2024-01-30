const express = require('express');
const router = express.Router();
const campaignsCtrl = require('../../controllers/api/campaigns');

router.get('/index', campaignsCtrl.getCampaignList);
router.post('/:id', campaignsCtrl.addCampaign);
router.post('/:campaignId/:description', campaignsCtrl.addCampaignDescription);

module.exports = router;