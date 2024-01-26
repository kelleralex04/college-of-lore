const express = require('express');
const router = express.Router();
const campaignsCtrl = require('../../controllers/api/campaigns');

router.get('/index', campaignsCtrl.getCampaignList);
router.get('/:id', campaignsCtrl.getCurCampaign);
router.post('/:id', campaignsCtrl.addCampaign);

module.exports = router;