const Category = require('../../models/category');
const Campaign = require('../../models/campaign');

module.exports = {
    addCategory,
    populateCategory,
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