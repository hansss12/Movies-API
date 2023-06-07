const { User, Detail, Card, Member } = require('../models')

class ControllerAccount {
    static async account(req, res, next) {
        try {
            const reqUser = req.user
            const data = await User.findByPk(reqUser.id, { include: [Detail, Card, Member] })
            res.status(200).json({
                message: 'Success',
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async addDetail(req, res, next) {
        try {
            const reqUser = req.user
            const { fullname, phone, card } = req.body
            if (!fullname || !phone) {
                throw { name: 'DetailEmpty' }
            }
            const create = await Detail.create({ fullname, phone, card, UserId: reqUser.id })
            res.status(201).json({
                message: 'Account detail has created',
            })
        } catch (error) {
            next(error)
        }
    }

    static async editDetail(req, res, next) {
        try {
            const reqUser = req.user
            const { fullname, phone, card } = req.body
            if (!fullname || !phone) {
                throw { name: 'DetailEmpty' }
            }
            if (!card) {
                throw { name: 'CardEmpty' }
            }
            const update = await Detail.update({ fullname, phone, card, }, { where: { UserId: reqUser.id } })
            res.status(200).json({
                message: 'Account detail updated successfully',
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerAccount