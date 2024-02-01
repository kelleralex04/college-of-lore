const Campaign = require('../../models/campaign');

module.exports = {
    getCampaignList,
    addCampaign,
    addCampaignDescription,
    addCampaignNote,
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
    console.log(req.params.description)
    campaign.description = req.params.description.replaceAll('<br>', '\n') 
    campaign.save()
    res.json(campaign);
}

async function addCampaignNote(req, res) {
    const campaign = await Campaign.findOne({ user: req.user._id, name: req.params.campaignId }).populate('category');
    campaign.campaignNote.push(req.params.note)
    campaign.save()
    res.json(campaign);
}