const express = require('express');
const router = express.Router();
const subjectsCtrl = require('../../controllers/api/subjects');

router.post('/:categoryId/:subjectId', subjectsCtrl.addSubject);
router.get('/:subjectId', subjectsCtrl.populateSubject);
router.delete('/:categoryId/:subjectId', subjectsCtrl.deleteSubject);
router.post('/:subjectId/name/:name/description/:description', subjectsCtrl.editSubject);
router.post('/:subjectId/name/:name', subjectsCtrl.editSubjectTitle);

module.exports = router;