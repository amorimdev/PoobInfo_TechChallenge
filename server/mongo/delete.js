'use strict'

module.exports.deleteOne = (model, query) => {
  return new Promise((resolve, reject) => {
    model.deleteOne(query, (err) => {
      if (err) {
        return reject(err)
      }

      resolve({})
    })
  })
}
