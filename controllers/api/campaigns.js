const Campaign = require('../../models/campaign');

module.exports = {
    getCampaignList,
    getCurCampaign,
    addCampaign,
    addCampaignDescription,
};

async function getCampaignList(req, res) {
    const campaignList = await Campaign.getCampaignList(req.user._id);
    res.json(campaignList);
}

async function getCurCampaign(req, res) {
    const campaign = await Campaign.findById(req.params.campaignId).populate('category').populate('sessionNote');
    res.json(campaign);
}

async function addCampaign(req, res) {
    await Campaign.create({ user: req.user._id, name: req.params.id, description: '' })
    const newCampaign = await Campaign.findOne({ user: req.user._id, name: req.params.id });
    res.json(newCampaign);
}

async function addCampaignDescription(req, res) {
    const campaign = await Campaign.findOne({ user: req.user._id, name: req.params.campaignId }).populate('category').populate('sessionNote');
    campaign.description = req.params.description.replaceAll('<br>', '\n') 
    campaign.save()
    res.json(campaign);
}