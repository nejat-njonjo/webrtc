const router = require('express').Router()
const classroomController = require('../controllers/classroom-controller')
const userController = require('../controllers/user-controller')

/**
 * Index Route
 */
router.get('/', (req, res) => {
  res.render('login')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/user', userController.createUser)
router.get('/user', userController.checkUser)

router.post('/classroom', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

module.exports = router
