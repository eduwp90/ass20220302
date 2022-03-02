const router = require('express').Router()
const commissionController = require('../controllers/commissionController')

// For a good practice, should use a validation middleware to verify the correct body
router.get('/v1/commission', commissionController.returnCommission)

// handle 404
router.all('*', function (req, res) {
  res.status(404).send('not found')
})

module.exports = router
