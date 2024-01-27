const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../controllers/api/categories');

router.post('/:id/:campaign', categoriesCtrl.addCategory);
router.get('/:campaign', categoriesCtrl.getCategoryList);

module.exports = router;