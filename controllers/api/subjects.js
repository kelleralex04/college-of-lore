const Subject = require('../../models/subject');
const Category = require('../../models/category');

module.exports = {
    addSubject,
};

async function addSubject(req, res) {
    await Subject.create({ name: req.params.subjectId })
    const newSubject = await Subject.findOne({ name: req.params.subjectId });
    const curCategory = await Category.findById(req.params.categoryId)
    curCategory.subject.push(newSubject)
    await curCategory.save();
    res.json(newSubject);
}