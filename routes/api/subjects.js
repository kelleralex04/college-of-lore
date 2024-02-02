const express = require('express');
const router = express.Router();
const subjectsCtrl = require('../../controllers/api/subjects');

router.post('/:categoryId/:subjectId', subjectsCtrl.addSubject);

module.exports = router;