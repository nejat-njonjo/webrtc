const classroomModel = require('./class-schema')

async function create(payload) {
  const result = await (await classroomModel.create(payload)).populate({path: 'host', select: '-password'})
  return result
}

async function find(query = null) {
  const result = await classroomModel.find(query ? query : {})
  return result
}

async function row(query) {
  const result = await classroomModel.findOne(query).populate({ path: 'host', select: '-password' })
  return result
}

module.exports = Object.freeze({
  create,
  find,
  row
})

