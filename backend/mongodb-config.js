const { connect } = require('mongoose')
const constants = require('./global/index')
const { logMessage, logError } = require('./controllers/utils')

let MONGO_URL = `mongodb+srv://${constants.mongoDB.username}:${constants.mongoDB.password}@${constants.mongoDB.cluster}/${constants.mongoDB.databaseName}?retryWrites=true&w=majority`

let isConnected = false
let database = null
const initializeDb = async () => {
  if (isConnected) return database

  try {
    logMessage(`MongoDB URL: ${MONGO_URL}`)
    console.log('🚀🚀🚀 initializeDb => Connecting to mongoDB')
    database = await connect(MONGO_URL)
    isConnected = !!(database.connections[0].readyState)
    console.log(`🚀🚀🚀 initializeDb => Database ${database.connections[0].name} Connected`)
    return database
  } catch (error) {
    logError(error.message)
    throw new Error(error)
  }
}

const getOrInitializeDatabase = async () => {
  if (!database) {
    return await initializeDb()
  }

  return database
}

module.exports = {
  getOrInitializeDatabase
}
