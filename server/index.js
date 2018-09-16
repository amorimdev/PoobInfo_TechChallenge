'use strict'

require('dotenv').config()
require('./mongo/connection')()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const router = require('./routes/router')
app.use('/', router)

const port = process.env.APP_PORT
const server = app.listen(port, () => console.log(`Listening server on port ${port}`))

module.exports = server
module.exports.stop = () => {
  server.close()
  process.exit(0)
}
