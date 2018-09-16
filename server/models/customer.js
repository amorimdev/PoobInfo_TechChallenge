'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  companyId: {
    type: String, ref: 'company'
  },
  createdAt: {
    type: Date,
    default: new Date().getTime()
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  dob: {
    type: Date
  }
})

autoIncrement.initialize(mongoose.connection)
CustomerSchema.plugin(autoIncrement.plugin, 'customer')

module.exports = mongoose.model('customer', CustomerSchema)
