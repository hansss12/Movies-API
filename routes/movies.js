const express = require('express')
const Controller = require('../controllers/controller')
const routerAccount = require('./account')
const router = express.Router()

router.get('/', Controller.movie)

router.use('/account', routerAccount)

router.patch('/update/:id', Controller.succesPay)
router.post('/payment/:id', Controller.checkout)
router.get('/:id', Controller.detail)
router.post('/:id/wishlist', Controller.wishList)

module.exports = router