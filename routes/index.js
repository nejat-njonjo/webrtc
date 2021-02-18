const router = require('express').Router()
const classroomController = require('../controllers/classroom-controller')
const userController = require('../controllers/user-controller')

/**
 * Index Route
 */
router.get('/', (req, res) => {
  res.render('login')
})

router.get('/home', (req, res) => {
  res.render('home',)
})

router.get('/rooms', (req, res) => {
  res.render('classroom', {
    roomId: null
  })
})

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', userController.login)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/user', userController.createUser)
router.get('/user', userController.checkUser)

router.post('/classroom', (req, res) => {
  res.send(req.body)
})

router.post('/session/:_id', userController.isLoggedIn)

module.exports = router
