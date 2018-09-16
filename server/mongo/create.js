'use strict'

module.exports.create = (model, payload) => {
  return new Promise((resolve, reject) => {
    model.create(payload, (err, entity) => {
      if (err) {
        return reject(err)
      }

      resolve(entity)
    })
  })
}
