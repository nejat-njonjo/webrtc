const classroomModel = require('./class-schema')

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

