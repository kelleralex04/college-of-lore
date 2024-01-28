const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../controllers/api/categories');

router.post('/:campaign/:id', categoriesCtrl.addCategory);
router.get('/:campaign', categoriesCtrl.getCategoryList);
router.get('/:campaignId/:categoryId', categoriesCtrl.getCurCategory);

module.exports = router;