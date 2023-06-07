const { verify } = require('../helper/auth')
const { User, Card } = require('../models')

const isAdmin = (req, res, next) => {
    try {
        const user = req.user
        if (user.role != 'admin') {
            throw { name: 'Unauthorize' }
        }
        next()
    } catch (error) {
        next(error)
    }
}

const isLogin = async (req, res, next) => {
    try {
        const access_token = req.headers['authorization']
        if (!access_token) {
            throw { name: 'Invalid token' }
        }

        const success = verify(access_token)
        if (!success) {
            throw { name: 'Invalid token' }
        }
        const user = await User.findByPk(success.id, {
            attributes: { exclude: 'password' }
        })
        if (!user) {
            throw { name: 'Invalid Login' }
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { isAdmin, isLogin }