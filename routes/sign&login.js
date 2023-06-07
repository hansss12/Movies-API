const express = require('express')
const loginController = require('../controllers/controllerLogin')
const router = express.Router()

router.post('/', loginController.gettingStart)
router.post('/register', loginController.register)
router.post('/sign-in', loginController.login)
router.post('/google', loginController.google)

module.exports = router 