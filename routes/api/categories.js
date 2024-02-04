const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../controllers/api/categories');

router.post('/:campaign/:id', categoriesCtrl.addCategory);
router.get('/:categoryId', categoriesCtrl.populateCategory);
router.post('/:categoryId/name/:name/description/:description', categoriesCtrl.editCategory);
router.post('/:categoryId/name/:name', categoriesCtrl.editCategoryTitle);
router.delete('/:campaignId/:categoryId', categoriesCtrl.deleteCategory);

module.exports = router;