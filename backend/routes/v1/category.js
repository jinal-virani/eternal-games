const router = require('express').Router()

const {
  createCategory,
  getCategory,
  getActiveCategoryList,
  getCategoryList,
  updateCategory,
  deleteCategory
} = require('../../controllers/category')

// User routes - /v1/Categories
router.get('/', getCategoryList)
router.get('/active-categories', getActiveCategoryList)
router.get('/:id', getCategory)
router.post('/add-category', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
