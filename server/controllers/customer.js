'use strict'

const model = require('../models/customer')
const { create, findOne, findAll, update, deleteOne } = require('./base')

module.exports.create = (req, res, next) => create(model, req, res, next)
module.exports.findOne = (req, res, next) => findOne(model, req, res, next)
module.exports.findAll = (req, res, next) => findAll(model, req, res, next)
module.exports.update = (req, res, next) => update(model, req, res, next)
module.exports.deleteOne = (req, res, next) => deleteOne(model, req, res, next)
