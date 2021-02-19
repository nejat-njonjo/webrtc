const db = require('./db')

const UserSchema = new db.Schema({
  name: String,
  username: String,
  password: String,
  status: {
    type: String,
    default: 'online'
  }
})

const userModel = db.model('User', UserSchema)

module.exports = userModel