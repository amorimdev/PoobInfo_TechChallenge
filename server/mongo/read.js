'use strict'

module.exports.findOne = (model, query) => {
  return new Promise((resolve, reject) => {
    model.findOne(query, (err, entity) => {
      if (err) {
        return reject(err)
      }

      resolve(entity)
    })
  })
}

module.exports.findAll = (model, query) => {
  return new Promise((resolve, reject) => {
    model.find(query, (err, entities) => {
      if (err) {
        return reject(err)
      }

      resolve(entities)
    })
  })
}
