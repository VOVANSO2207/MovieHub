const { getAllCategories, addCategory, deleteCategory, updateCategory } = require('../models/categoryModel');

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).send('Error fetching categories');
  }
};

const addNewCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await addCategory(name);
    res.status(201).json({ category_id: result.insertId, name });
  } catch (error) {
    res.status(500).send('Error adding category');
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategory(id);
    res.status(200).send('Category deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting category');
  }
};

const updateCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await updateCategory(id, name);
    res.status(200).send('Category updated successfully');
  } catch (error) {
    res.status(500).send('Error updating category');
  }
};

module.exports = { getCategories, addNewCategory, deleteCategoryById, updateCategoryDetails };