const Category = require('../../models/category');
const Campaign = require('../../models/campaign');

module.exports = {
    addCategory,
    getCategoryList,
    getCurCategory,
};

async function addCategory(req, res) {
    await Category.create({ name: req.params.id })
    const newCategory = await Category.findOne({ name: req.params.id });
    const curCampaign = await Campaign.findOne({ user: req.user._id, name: req.params.campaign });
    curCampaign.category.push(newCategory);
    await curCampaign.save();
    res.json(newCategory);
}

async function getCategoryList(req, res) {
    const categoryList = []
    const curCampaign = await Campaign.findOne({ user: req.user._id, name: req.params.campaign });
    curCampaign.category.forEach(c => {
        let category = Category.findById(c._id)
        categoryList.push(category)
    })
    res.json(categoryList);
}

async function getCurCategory(req, res) {
    // const curCampaign = await Campaign.findOne({ user: req.user._id, name: req.params.campaign });
    const curCategory = await Category.findOne({ name: req.params.categoryId })
    res.json(curCategory)
}