const { Movie, User, UserMovies, Detail, Card, Member } = require('../models')
const { Op } = require('sequelize')

class ControllerAdmin {
    static async admin(req, res, next) {
        try {
            const data = await User.allUser()
            res.status(200).json({
                message: 'Success',
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async list(req, res, next) {
        try {
            const { search } = req.query
            let where = {}
            if (search) {
                where.name = { [Op.iLike]: `%${search}%` }
            }
            const data = await Movie.findAll({ where })
            res.status(200).json({
                message: 'Success',
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const findUser = await User.findByPk(id)
            if (!findUser) {
                throw { name: 'UserNotFound' }
            }
            const destroyDetail = await Detail.destroy({ where: { UserId: id } })
            const destroyCard = await Card.destroy({ where: { UserId: id } })
            const destroyWishlist = await UserMovies.destroy({ where: { UserId: id } })
            const destroy = await User.destroy({ where: { id } })
            res.status(200).json({
                message: `Successfully delete user with id: ${id}`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerAdmin