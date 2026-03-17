const router = require('express').Router()

const {
  createWebsite,
  getWebsite,
  getWebsiteList,
  updateWebsite,
  deleteWebsite
} = require('../../controllers/website')

// User routes - /v1/websites
router.get('/:id', getWebsite)
router.get('/', getWebsiteList)
router.post('/create', createWebsite)
router.put('/:id', updateWebsite)
router.delete('/:id', deleteWebsite)

module.exports = router
