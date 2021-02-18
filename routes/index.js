const router = require('express').Router()

/**
 * Index Route
 */
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
