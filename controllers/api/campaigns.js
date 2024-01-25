const Campaign = require('../../models/campaign');

module.exports = {
    getCampaignList,
    addCampaign
};

async function getCampaignList(req, res) {
    const campaignList = await Campaign.getCampaignList(req.user._id);
    res.json(campaignList);
}

async function addCampaign(req, res) {
    Campaign.create({ user: req.user._id, name: req.params.id })
    const campaignList = await Campaign.getCampaignList(req.user._id);
    res.json(campaignList);
}