const mongoose = require('mongoose')

const modelName = 'info'

const infoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  textArea: { type: String },
  image: {
    data: Buffer,
    contentType: String
  }
})

module.exports = mongoose.model(modelName, infoSchema)
