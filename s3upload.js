const campaignsCtrl = require('./controllers/api/campaigns');
const express = require('express')

const router = express.Router()

router.post('/upload/:campaignId/:imageName', campaignsCtrl.uploadImage)

module.exports = router