'use strict'

const { create } = require('../mongo/create')
const { findOne, findAll } = require('../mongo/read')
const { update } = require('../mongo/update')
const { deleteOne } = require('../mongo/delete')

module.exports.create = function (model, req, res, next) {
  const payload = { name: req.body.name }

  create(model, payload)
    .then(result => res.json({ status: true, result }))
    .catch(err => next(err))
}

module.exports.findOne = function (model, req, res, next) {
  const query = { _id: req.params.id }

  findOne(model, query)
    .then(result => res.json({ status: true, result }))
    .catch(err => next(err))
}

module.exports.findAll = function (model, req, res, next) {
  findAll(model, {})
    .then(result => res.json({ status: true, result }))
    .catch(err => next(err))
}

module.exports.update = function (model, req, res, next) {
  const query = { _id: req.params.id }
  const payload = { name: req.body.name }

  update(model, query, payload)
    .then(result => res.json({ status: true, result }))
    .catch(err => next(err))
}

module.exports.deleteOne = function (model, req, res, next) {
  const query = { _id: req.params.id }

  deleteOne(model, query)
    .then(result => res.json({ status: true, result }))
    .catch(err => next(err))
}
