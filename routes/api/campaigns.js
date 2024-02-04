const express = require('express');
const router = express.Router();
const campaignsCtrl = require('../../controllers/api/campaigns');

router.get('/index', campaignsCtrl.getCampaignList);
router.get('/:campaignId', campaignsCtrl.getCurCampaign);
router.post('/:id', campaignsCtrl.addCampaign);
router.post('/:campaignId/name/:name/description/:description', campaignsCtrl.editCampaign);
router.post('/:campaignId/name/:name', campaignsCtrl.editCampaignTitle);
router.delete('/:campaignId', campaignsCtrl.deleteCampaign);

module.exports = router;