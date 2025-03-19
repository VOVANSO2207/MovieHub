const express = require('express');
const router = express.Router();
const { getCategories, addNewCategory, deleteCategoryById, updateCategoryDetails } = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', addNewCategory);
router.delete('/:id', deleteCategoryById);
router.put('/:id', updateCategoryDetails);

module.exports = router;