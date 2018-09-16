'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortId = require('shortid')

const CompanySchema = new Schema({
  _id: {
    type: String,
    default: shortId.generate
  },
  createdAt: {
    type: Date,
    default: new Date().getTime()
  },
  name: {
    type: String,
    required: true
  },
  customers: [
    {
      type: Schema.Types.ObjectId, ref: 'customer'
    }
  ]
})

module.exports = mongoose.model('company', CompanySchema)
