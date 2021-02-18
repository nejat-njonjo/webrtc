const classroomModel = require('../models/classroom-model')
const uuid = require('uuid')

async function getClasses(req, res) {
  try {
    const classes = classroomModel.find()
    res.send(classes)
  } catch (error) {
    res.send({error: 'Error occured' + error.message})
  }
}

async function createClassroom(req, res) {
  try {
    const data = req.body

    Object.assign(data, {
      key: uuid()
    })

    const classroom = await classroomModel.create(req.body)
    res.send(classroom)
  } catch (error) {
    res.send({error: 'could not create classroom'})
  }
}

module.exports = Object.freeze({
  getClasses,
  createClassroom
})