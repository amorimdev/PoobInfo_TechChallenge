'use strict'

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.APP_PORT

app.get('/api', (req, res) => {
  res.send({ message: 'Hello world!' })
})

const server = app.listen(port, () => console.log(`Listening on port ${port}`))
module.exports = server
