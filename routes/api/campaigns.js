const express = require('express');
const router = express.Router();
const campaignsCtrl = require('../../controllers/api/campaigns');

router.get('/index', campaignsCtrl.getCampaignList);
router.get('/:campaignId', campaignsCtrl.getCurCampaign);
router.post('/:id', campaignsCtrl.addCampaign);
router.post('/:campaignId/name/:name/description/:description', campaignsCtrl.editCampaign);
router.post('/:campaignId/name/:name', campaignsCtrl.editCampaignTitle);
router.delete('/:campaignId', campaignsCtrl.deleteCampaign);
router.post('/:campaignId/image/:imageId', campaignsCtrl.addImage);
router.delete('/:campaignId/image/:imageId', campaignsCtrl.deleteImage);

module.exports = router;