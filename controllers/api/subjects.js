const Subject = require('../../models/subject');
const Category = require('../../models/category');

module.exports = {
    addSubject,
    populateSubject,
};

async function addSubject(req, res) {
    await Subject.create({ name: req.params.subjectId })
    const newSubject = await Subject.findOne({ name: req.params.subjectId });
    const curCategory = await Category.findById(req.params.categoryId).populate('subject')
    curCategory.subject.push(newSubject)
    await curCategory.save();
    res.json(curCategory);
}

async function populateSubject(req, res) {
    const subject = await Subject.findById(req.params.subjectId).populate('subjectNote')
    res.json(subject);
}