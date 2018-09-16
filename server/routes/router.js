'use strict'

const express = require('express')
const router = express.Router({})
const company = require('./company')
const customer = require('./customer')

router.use('/companies', company)
router.use('/customers', customer)

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ status: false, message: err.message || err })
})

module.exports = router
