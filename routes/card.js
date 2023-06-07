const express = require('express')
const ControllerCard = require('../controllers/controllerCard')
const router = express.Router()

router.get('/', ControllerCard.card)
router.post('/', ControllerCard.addCard)
router.get('/:membership', ControllerCard.cardValidate)
router.post('/:membership', ControllerCard.validationCard)

module.exports = router