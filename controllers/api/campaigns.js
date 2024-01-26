const Campaign = require('../../models/campaign');

module.exports = {
    getCampaignList,
    addCampaign,
    getCurCampaign
};

async function getCampaignList(req, res) {
    const campaignList = await Campaign.getCampaignList(req.user._id);
    res.json(campaignList);
}

async function addCampaign(req, res) {
    await Campaign.create({ user: req.user._id, name: req.params.id })
    const newCampaign = await Campaign.findOne({ user: req.user._id, name: req.params.id });
    res.json(newCampaign);
}

async function getCurCampaign(req, res) {
    const curCampaign = await Campaign.findOne({ user: req.user._id, name: req.params.id });
    res.json(curCampaign)
}