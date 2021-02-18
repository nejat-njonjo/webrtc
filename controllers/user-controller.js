const userModel = require('../models/user-model')

async function createUser(req, res) {
  try {
    const keys = Object.keys(req.body)
    const permits = ['name', 'username', 'password']

    if (keys.length < permits.length || keys.length > permits.length) {
      res.send({error: "incorrect fields"})
      return
    }

    for (field of keys) {
      if(!req.body[field]) {
        res.send({ error: "incorrect fields" })
        break
      }
    }

    const payload = await userModel.create(req.body)
    res.status(201).send(payload)
  } catch (error) {
    res.send({error: 'Cannot create user: '+ error})
  }
}

async function checkUser(req, res) {
  try {
    const result = await userModel.find(req.query)
    res.send(result)
  } catch (error) {
    res.send({ error: 'Cannot create user' })
  }
}

async function login(req, res) {
  try {
    const user = await userModel.row(req.body)

    if (user) {
      const update = await userModel.update(user.username, { status: 'online' })
      if (update.nModified > 0 || update.ok > 0) {
        res.send({ success: true, data: user })
      } else {
        res.send({ success: false })
      }
    } else {
      res.send({success: false})
    }
  } catch (error) {
    res.send({ error: 'Login error' })
  }
}

async function isLoggedIn(req, res) {
  try {
    const {_id} = req.params
    const user = await userModel.row({_id, status: 'online'})

    if (!user) {
      res.send({success: false})
      return
    }

    res.send({success: true})
  } catch (error) {
    res.send(false)
  }
}

module.exports = Object.freeze({
  createUser,
  checkUser,
  login,
  isLoggedIn
})
