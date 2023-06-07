const express = require('express')
const ControllerAdmin = require('../controllers/controllerAdmin')
const router = express.Router()
const { isAdmin } = require('../middlewares')

router.get('/', isAdmin, ControllerAdmin.admin)
router.get('/list', isAdmin, ControllerAdmin.list)
router.delete('/:id', isAdmin, ControllerAdmin.delete)

module.exports = router