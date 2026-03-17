// BASIC
exports.ENVIRONMENT = process.env.ENVIRONMENT
exports.PORT = process.env.PORT

// MONGO DB
exports.mongoDB = {
  username: process.env.mongoDB_username,
  password: process.env.mongoDB_password,
  cluster: process.env.mongoDB_cluster,
  databaseName: process.env.mongoDB_databaseName
}

// JWT
exports.security = {
  SALT: Number(process.env.SECURITY_SALT),
  TOKEN_SECRET: process.env.SECURITY_TOKEN_SECRET
}

// STATUS CODE
exports.ResponseStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_NOT_AVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}
