'use strict'

require('dotenv').config()
require('./mongo/connection')()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.json())
app.use(methodOverride())
app.use(logErrors)
app.use(errorHandler)

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(500).json({ status: false, message: err.toString() })
}

const company = require('./routes/company')
app.use('/companies', company)

const customer = require('./routes/customer')
app.use('/customers', customer)

const port = process.env.APP_PORT
const server = app.listen(port, () => console.log(`Listening server on port ${port}`))

module.exports = server
