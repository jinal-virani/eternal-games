const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose
const { defaultFields, defaultSchemaOptions } = require('./model-utils')

const websiteSchema = new Schema({
  _id: { type: Schema.Types.String, required: true, default: uuidv4 },
  logo: { type: Schema.Types.String, required: true },
  name: { type: Schema.Types.String, required: true },
  cover: { type: Schema.Types.String, required: false },
  androidLink: { type: Schema.Types.String, required: false },
  iosLink: { type: Schema.Types.String, required: false },
  ...defaultFields
}, {
  ...defaultSchemaOptions
})

const Website = mongoose.model('website', websiteSchema, 'websites')

module.exports = Website
