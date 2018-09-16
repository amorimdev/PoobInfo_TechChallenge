module.exports = (model, query, payload) => {
  return new Promise((resolve, reject) => {
    model.findOneAndUpdate(query, payload, (err, entity) => {
      if (err) {
        return reject(err)
      }

      resolve(entity)
    })
  })
}
