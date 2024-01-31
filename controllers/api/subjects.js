const Subject = require('../../models/subject');
const Category = require('../../models/category');
const Campaign = require('../../models/campaign');

module.exports = {
    addSubject,
};

async function addSubject(req, res) {
    await Subject.create({ name: req.params.subjectId })
    const newSubject = await Subject.findOne({ name: req.params.subjectId });
    const curCampaign = await Campaign.findOne({ user: req.user._id, name: req.params.campaignId }).populate('category');
    let catId = ''
    curCampaign.category.forEach((c) => {
        if (c.name === req.params.categoryId) {
            catId = c._id
        }
    })
    const curCategory = await Category.findById(catId)
    curCategory.subject.push(newSubject)
    await curCategory.save();
    res.json(newSubject);
}