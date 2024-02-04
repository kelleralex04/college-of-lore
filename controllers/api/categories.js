const Campaign = require('../../models/campaign');
const Category = require('../../models/category');
const Subject = require('../../models/subject');

module.exports = {
    addCategory,
    populateCategory,
    editCategory,
    editCategoryTitle,
    deleteCategory,
};

async function addCategory(req, res) {
    await Category.create({ name: req.params.id })
    const newCategory = await Category.findOne({ name: req.params.id });
    const curCampaign = await Campaign.findOne({ user: req.user._id, name: req.params.campaign });
    curCampaign.category.push(newCategory);
    await curCampaign.save();
    res.json(newCategory);
}

async function populateCategory(req, res) {
    const updatedCategory = await Category.findById(req.params.categoryId).populate('subject')
    res.json(updatedCategory);
}

async function editCategory(req, res) {
    const category = await Category.findById(req.params.categoryId).populate('subject');
    category.name = req.params.name
    category.description = req.params.description.replaceAll('<br>', '\n') 
    category.save()
    res.json(category);
}

async function editCategoryTitle(req, res) {
    const category = await Category.findById(req.params.categoryId).populate('subject');
    category.name = req.params.name
    category.description = undefined
    category.save()
    res.json(category);
}

async function deleteCategory(req, res) {
    let campaign = await Campaign.findById(req.params.campaignId)
    const catIdx = campaign.category.indexOf(req.params.categoryId)
    campaign.category.splice(catIdx, 1)
    campaign.save()
    const category = await Category.findById(req.params.categoryId).populate('subject');
    for (let i = category.subject.length - 1; i >=0; i--) {
        await Subject.deleteOne({_id: category.subject[i]})
    }
    await Category.deleteOne({_id: req.params.categoryId})
    const user = req.user._id
    res.json(user)
}