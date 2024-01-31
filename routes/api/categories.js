const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../controllers/api/categories');

router.post('/:campaign/:id', categoriesCtrl.addCategory);
router.get('/:categoryId', categoriesCtrl.populateCategory);

module.exports = router;