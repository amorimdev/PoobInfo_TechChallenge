'use strict'

const { create } = require('../mongo/create')
const { findOne, findAll } = require('../mongo/read')
const { update } = require('../mongo/update')
const { deleteOne } = require('../mongo/delete')

module.exports.create = function (model, req, res, next) {
  const payload = getPayload(model, req)

  create(model, payload)
    .then(result => res.json({ status: true, result }))
    .catch(err => next(err))
}

module.exports.findOne = function (model, req, res, next) {
  console.log()
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
  const payload = getPayload(model, req)

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

function getPayload (model, req) {
  const payload = {}

  for (const key of Object.keys(model.schema.obj)) {
    if (req.body[key]) {
      payload[key] = req.body[key]
    }
  }

  return payload
}
