const express = require('express')
const ControllerAccount = require('../controllers/controllerAccount')
const router = express.Router()

router.get('/', ControllerAccount.account)
router.post('/', ControllerAccount.addDetail)
router.put('/', ControllerAccount.editDetail)

module.exports = router