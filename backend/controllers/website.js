const { WebsiteStore } = require('../models')

const { sendSuccess, sendError } = require('./utils')

const createWebsite = async (req, res) => {
  try {
    const websiteInfo = req.body

    if (!websiteInfo) {
      return sendError(res, 'website data not found', null, 404)
    }

    const website = await WebsiteStore.create(websiteInfo)

    return sendSuccess(res, { data: website })
  } catch (error) {
    return sendError(res, 'Error while adding website', error)
  }
}

const getWebsite = async (req, res) => {
  try {
    const websiteId = req.params.id

    if (!websiteId) {
      return sendError(res, 'websiteId not found', null, 404)
    }

    const website = await WebsiteStore.findById(websiteId)

    return sendSuccess(res, { website })
  } catch (error) {
    return sendError(res, 'Error while getting website', error)
  }
}

const getWebsiteList = async (req, res) => {
  try {
    const websites = await WebsiteStore.find()

    return sendSuccess(res, { websites })
  } catch (error) {
    return sendError(res, 'can\'t find website list', error)
  }
}

//PUBLIC API
const getWebsiteListPublic = async (req, res) => {
  try {
    const websites = await WebsiteStore.find().select({ createdOn: 0, updatedOn: 0 })

    return sendSuccess(res, { websites })
  } catch (error) {
    return sendError(res, 'can\'t find website list', error)
  }
}

const updateWebsite = async (req, res) => {
  try {
    const websiteId = req.params.id
    const {
      logo,
      name,
      cover,
      androidLink,
      iosLink
    } = req.body

    if (!websiteId) {
      return sendError(res, 'invalid websiteId', null, 404)
    }

    const updateWebsite = await WebsiteStore.updateOne({ _id: websiteId }, {
      logo,
      name,
      cover,
      androidLink,
      iosLink
    })

    if (!updateWebsite) {
      return sendError(res, 'website not found', null, 404)
    }

    return sendSuccess(res, 'website updated successfully')
  } catch (error) {
    return sendError(res, 'internal server error', error, 404)
  }
}

const deleteWebsite = async (req, res) => {
  try {
    const websiteId = req.params.id

    const deleteWebsite = await WebsiteStore.findByIdAndDelete(websiteId)

    if (!deleteWebsite) {
      return sendError(res, 'website not found', null, 404)
    }

    return sendSuccess(res, { deleteWebsite })
  } catch (error) {
    return sendError(res, 'Internal server error', error, 404)
  }
}

module.exports = {
  createWebsite,
  getWebsite,
  getWebsiteList,
  getWebsiteListPublic,
  updateWebsite,
  deleteWebsite
}
