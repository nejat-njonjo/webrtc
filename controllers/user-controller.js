const userModel = require('../models/user-model')

async function createUser(req, res) {
  try {
    const keys = Object.keys(req.body)
    const permits = ['name', 'username', 'role', 'password']

    if (keys.length < permits.length || keys.length > permits.length) {
      res.send({error: "incorrect fields"})
      return
    }

    for (field of keys) {
      if(!req.body[key]) {
        res.send({ error: "incorrect fields" })
        break
      }
    }

    const payload = await userModel.create(req.body)
    res.send(payload)
  } catch (error) {
    res.send({error: 'Cannot create user'})
  }
}

async function checkUser(req, res) {
  try {
    const result = await userModel.find(req.body)
    res.send(result)
  } catch (error) {
    res.send({ error: 'Cannot create user' })
  }
}

async function login(req, res) {
  try {
    const user = await userModel.find(req.body)
    console.log(user)
  } catch (error) {
    res.send({ error: 'Login error' })
  }
}

module.exports = Object.freeze({
  createUser,
  checkUser,
  login
})
