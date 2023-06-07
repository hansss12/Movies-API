const { createToken } = require('../helper/auth')
const { Card, Member } = require('../models')

class ControllerCard {
    static async card(req, res, next) {
        try {
            const reqUser = req.user
            const data = await Card.findOne({ where: { UserId: reqUser.id } })
            res.status(200).json({
                message: 'Success',
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async addCard(req, res, next) {
        try {
            const reqUser = req.user
            const data = await Card.findOne({ where: { UserId: reqUser.id } })
            if (data) {
                throw { name: 'CardExist' }
            }
            const { cardNumber, holder, month, year, cvv } = req.body
            const created = await Card.create({
                cardNumber,
                holder,
                month,
                year,
                cvv,
                UserId: reqUser.id
            })
            const payload = {
                data
            }
            const card_token = createToken(payload)
            res.status(201).json({
                message: `Congratulation ${reqUser.username} you have register your card`,
                card_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async cardValidate(req, res, next) {
        try {
            const { membership } = req.params
            const reqUser = req.user
            const find = await Member.findByPk(membership)
            if (!find) {
                throw { name: 'MembershipNotFound' }
            }
            const data = await Card.findOne({
                where: { UserId: reqUser.id }
            })
            res.status(200).json({
                message: 'Success',
                data,
                membership
            })
        } catch (error) {
            next(error)
        }
    }

    static async validationCard(req, res, next) {
        try {
            const { membership } = req.params
            const find = await Member.findByPk(membership)
            if (!find) {
                throw { name: 'MembershipNotFound' }
            }
            const reqUser = req.user
            const { cardNumber, holder, month, year, cvv } = req.body
            const data = await Card.findOne({ where: { UserId: reqUser.id } })
            if (data.cardNumber === cardNumber && data.holder === holder && data.month === month && data.year === year) {
                if (data.cvv == cvv) {
                    res.status(200).json({
                        message: 'Success'
                    })
                } else {
                    throw { name: 'InvalidCVV' }
                }
            } else {
                throw { name: 'InvalidCard' }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerCard