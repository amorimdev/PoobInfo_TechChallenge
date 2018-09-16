'use strict'

const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection is open to ${process.env.MONGO_URL}`)
  })

  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection has occurred ${err} error`)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected')
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection is disconnected due to application termination')
      process.exit(0)
    })
  })
}
