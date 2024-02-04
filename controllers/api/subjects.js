const Category = require('../../models/category');
const Subject = require('../../models/subject');
const Note = require('../../models/note');

module.exports = {
    addSubject,
    populateSubject,
    deleteSubject,
    editSubject,
    editSubjectTitle,
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

async function deleteSubject(req, res) {
    let category = await Category.findById(req.params.categoryId)
    const subIdx = category.subject.indexOf(req.params.subjectId)
    category.subject.splice(subIdx, 1)
    category.save()
    const subject = await Subject.findById(req.params.subjectId).populate('subjectNote')
    for (let i = subject.subjectNote.length - 1; i >= 0; i--) {
        await Note.deleteOne({_id: subject.subjectNote[i]})
    }
    await Subject.deleteOne({_id: req.params.subjectId})
    const user = req.user._id
    res.json(user)
}

async function editSubject(req, res) {
    const subject = await Subject.findById(req.params.subjectId).populate('subjectNote')
    subject.name = req.params.name
    subject.description = req.params.description.replaceAll('<br>', '\n')
    subject.save()
    res.json(subject);
}

async function editSubjectTitle(req, res) {
    const subject = await Subject.findById(req.params.subjectId).populate('subjectNote')
    subject.name = req.params.name
    subject.description = undefined
    subject.save()
    res.json(subject);
}
