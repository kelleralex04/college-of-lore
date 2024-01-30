const Campaign = require('../../models/campaign');

module.exports = {
    getCampaignList,
    addCampaign,
    addCampaignDescription,
};

async function getCampaignList(req, res) {
    const campaignList = await Campaign.getCampaignList(req.user._id);
    res.json(campaignList);
}

async function addCampaign(req, res) {
    await Campaign.create({ user: req.user._id, name: req.params.id, description: '' })
    const newCampaign = await Campaign.findOne({ user: req.user._id, name: req.params.id });
    res.json(newCampaign);
}

async function addCampaignDescription(req, res) {
    const campaign = await Campaign.findOne({ user: req.user._id, name: req.params.campaignId }).populate('category');
    campaign.description = req.params.description
    campaign.save()
    res.json(campaign);
}