'use strict'

module.exports.deleteOne = (model, query) => {
  return new Promise((resolve, reject) => {
    model.deleteOne(query, (err, result) => {
      if (err) {
        return reject(err)
      }

      if (!result.n) {
        return reject(new Error('Entity not found.'))
      }

      resolve()
    })
  })
}
