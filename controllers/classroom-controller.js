const classroomModel = require('../models/classroom-model')
const {uuid} = require('uuid')

const randomChars = max => {
  let randomized = ''
  const rand = Math.random().toString(36)
  if (parseInt(max) <= 3) {
    randomized = `${rand.substring(2, 4)}${rand.substring(2, 4)}`
  } else {
    randomized = `${rand.substring(2, max)}${rand.substring(2, max)}`
  }

  return randomized.substr(0, max)
}

async function getHostRoom(req, res) {
  try {
    const room = await classroomModel.row({key: req.params.roomKey})
    res.render('classroom', {
      roomId: req.params.roomKey,
      room
    })
  } catch (error) {
    res.send({error: 'Error occured' + error.message})
  }
}

async function getRooms(req, res) {
  try {
    const rooms = classroomModel.find().populate('host')
    res.render('room', {
      rooms
    })
  } catch (error) {
    res.send({ error: 'Error occured' + error.message })
  }
}

async function createRoom(req, res) {
  try {
    const { className, subject, topic, description, user} = req.body
    const data = {
      className,
      subject,
      topic,
      description,
      key: `${randomChars(10)}-${randomChars(10)}-${randomChars(10)}-${randomChars(10)}${randomChars(10)}-${randomChars(10)}`,
      host: user._id
    }

    const room = await classroomModel.create(data)

    res.send(room)
  } catch (error) {
    res.send({error: 'could not create classroom: '+ error},)
  }
}

module.exports = Object.freeze({
  getHostRoom,
  createRoom,
  getRooms
})