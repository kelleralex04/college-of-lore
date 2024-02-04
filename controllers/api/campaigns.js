const Campaign = require('../../models/campaign');
const Category = require('../../models/category');
const Subject = require('../../models/subject');
const Note = require('../../models/note');

module.exports = {
    getCampaignList,
    getCurCampaign,
    addCampaign,
    editCampaign,
    editCampaignTitle,
    deleteCampaign,
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

async function editCampaign(req, res) {
    const campaign = await Campaign.findById(req.params.campaignId).populate('category').populate('sessionNote');
    campaign.name = req.params.name
    campaign.description = req.params.description.replaceAll('<br>', '\n') 
    campaign.save()
    res.json(campaign);
}

async function editCampaignTitle(req, res) {
    const campaign = await Campaign.findById(req.params.campaignId).populate('category').populate('sessionNote');
    campaign.name = req.params.name
    campaign.description = undefined 
    campaign.save()
    res.json(campaign);
}

async function deleteCampaign(req, res) {
    const campaign = await Campaign.findById(req.params.campaignId).populate('category')
    for (let i = campaign.category.length - 1; i >= 0; i--) {
        for (let j = campaign.category[i].subject.length - 1; j >=0; j--) {
            let subject = await Subject.findById(campaign.category[i].subject[j])
            for (let k = subject.subjectNote.length - 1; k >= 0; k--) {
                await Note.deleteOne({_id: subject.subjectNote[k]})
            }
            await Subject.deleteOne({_id: campaign.category[i].subject[j]})
        }
        await Category.deleteOne({_id: campaign.category[i]._id})
    }
    for (let i = campaign.sessionNote.length - 1; i >=0; i--) {
        await Note.deleteOne({_id: campaign.sessionNote[i]})
    }
    await Campaign.deleteOne({_id: req.params.campaignId});
    const user = req.user._id
    res.json(user)
}