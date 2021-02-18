const router = require('express').Router()

/**
 * Index Route
 */
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/classroom', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

module.exports = router
