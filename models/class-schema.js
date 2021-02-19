const db = require('./db')

const AttendantSchema = new db.Schema({
  name: String
})

const ClassroomSchema = new db.Schema({
  className: String,
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

const classroomModel = db.model('Classroom', ClassroomSchema)

module.exports = classroomModel
