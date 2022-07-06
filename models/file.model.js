'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let FileSchema = new Schema({
  name: {
    type: String
  },
  filestorageId: {
    type: Number,
    index: true,
    unique: true
  },
  type: {
    'type': String,
    'trim': true,
    'default': ''
  },
  extension: {
    type: String
  },
  uploadedBy: {
    type: String
  },
  uploadedAt: {
    type: String
  },
  updatedBy: {
    type: String
  },
  updatedAt: {
    type: String
  },
  filesize: {
    type: Number
  }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('File', FileSchema)
