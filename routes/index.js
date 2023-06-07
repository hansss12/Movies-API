const express = require('express')
const { isLogin } = require('../middlewares')
const router = express.Router()
const loginRouter = require('./sign&login')
const moviesRouter = require('./movies')
const routerCard = require('./card')
const routerAdmin = require('./admin')

router.use('/', loginRouter)

router.use(isLogin)

router.use('/movies', moviesRouter)

router.use('/card', routerCard)

router.use('/admin', routerAdmin)

module.exports = router