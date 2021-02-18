const db = require('./db')

const UserSchema = new db.Schema({
  name: String,
  username: String,
  password: String,
  status: {
    type: String,
    default: 'online'
  },
  role: String
})

const userModel = db.model('user', UserSchema)

async function create(payload) {
  const result = await userModel.create(payload)
  return result
}

async function find(query = null) {
  const result = await userModel.find(query ? query : {})
  return result
}

async function update(username, data) {
  const result = await userModel.updateOne({username}, {
    $set:{data}
  })
  return result
}

module.exports = Object.freeze({
  create,
  find
})
