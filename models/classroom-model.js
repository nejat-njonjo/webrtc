const db = require('./db')

const AttendantSchema = new db.Schema({
  name: String
})

const ClassroomSchema = new db.Schema({
  class: String,
  subject: String,
  status: {
    type: String,
    default: 'active'
  },
  topic: String,
  description: String,
  attendants: [AttendantSchema],
  host: {
    type: db.Schema.Types.ObjectId,
    ref: 'User'
  },
  key: String
})

const classroomModel = db.model('classroom', ClassroomSchema)

async function create(payload) {
  const result = await classroomModel.create(payload)
  return result
}

async function find(query = null) {
  const result = await classroomModel.find(query ? query : {})
  return result
} 

module.exports = Object.freeze({
  create,
  find
})

