const { CategoryStore } = require('../models')
const { sendSuccess, sendError } = require('./utils')

const createCategory = async (req, res) => {
  try {
    const categoryInfo = req.body

    if (!categoryInfo) {
      return sendError(res, 'category not found', null, 404)
    }

    const category = await CategoryStore.create(categoryInfo)

    return sendSuccess(res, { category })
  } catch (error) {
    return sendError(res, 'Error while adding category', error)
  }
}

const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id

    if (!categoryId) {
      return sendError(res, 'categoryId not found', null, 404)
    }

    const category = await CategoryStore.findById(categoryId)

    return sendSuccess(res, { category })
  } catch (error) {
    return sendError(res, 'Error while getting category', error)
  }
}

const getCategoryList = async (req, res) => {
  try {
    const categories = await CategoryStore.find().sort({ createdOn: -1 })
    return sendSuccess(res, { categories })
  } catch (error) {
    return sendError(res, 'can\'t find category list', error)
  }
}

const getActiveCategoryList = async (req, res) => {
  try {
    const categories = await CategoryStore.find({ status: 'active' }).sort({ createdOn: -1 })
    return sendSuccess(res, { categories })
  } catch (error) {
    return sendError(res, 'can\'t find category list', error)
  }
}

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const { categoryName, categoryIcon, status } = req.body

    if (!categoryId) {
      return sendError(res, 'invalid category id', null, 404)
    }

    const updateCategory = await CategoryStore.updateOne({ _id: categoryId }, {
      categoryName, categoryIcon, status
    })

    if (!updateCategory) {
      return sendError(res, 'category not found', null, 404)
    }

    return sendSuccess(res, 'category updated successfully')
  } catch (error) {
    return sendError(res, 'internal server error', error, 404)
  }
}

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id

    const deleteCategory = await CategoryStore.findByIdAndDelete(categoryId)

    if (!deleteCategory) {
      return sendError(res, 'category not found', null, 404)
    }

    return sendSuccess(res, { deleteCategory })
  } catch (error) {
    return sendError(res, 'Internal server error', error, 404)
  }
}

module.exports = {
  createCategory,
  getCategory,
  getActiveCategoryList,
  getCategoryList,
  updateCategory,
  deleteCategory
}
