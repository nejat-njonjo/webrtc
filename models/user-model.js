const userModel = require('./user-schema')

async function create(payload) {
  const result = await userModel.create(payload)
  return result
}

async function find(query = null) {
  const result = await userModel.find(query ? query : {})
  return result
}

async function row(query) {
  const result = await userModel.findOne(query)
  return result
}

async function update(username, data) {
  const result = await userModel.updateOne({username}, {
    $set: data
  })
  return result
}

module.exports = Object.freeze({
  create,
  find,
  update,
  row
})
