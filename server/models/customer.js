'use strict'

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  companyId: {
    type: String, ref: 'Company'
  },
  createdAt: {
    type: Date,
    default: new Date().getTime()
  },
  rewardsNumber: {
    type: String,
    required: true
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

mongoose.set('useCreateIndex', true)
autoIncrement.initialize(mongoose.connection)
CustomerSchema.plugin(autoIncrement.plugin, {
  model: 'Customer',
  field: '_id',
  startAt: 1,
  incrementBy: 1
})

module.exports = mongoose.model('Customer', CustomerSchema)
