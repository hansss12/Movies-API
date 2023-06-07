const nodeMailer = require('../helper/nodemailer');
const { Movie, User, UserMovies, Detail, Card, Member } = require('../models')
const midtransClient = require('midtrans-client');
// Create Snap API instance
require("dotenv").config()


class Controller {
    static async movie(req, res, next) {
        try {
            const user = req.user
            const movie = await Movie.findAll({})
            const slider = await Movie.findAll({ where: { location: 'slider' } })
            const favorite = await Movie.findAll({ where: { location: 'favorite' } })
            const popular = await Movie.findAll({ where: { location: 'popular' } })
            const trending = await Movie.findAll({ where: { location: 'top-10' } })
            const sport = await Movie.findAll({ where: { location: 'suggested' } })
            const parallax = await Movie.findAll({ where: { location: 'parallax' } })
            const wishList = await UserMovies.findAll({ include: Movie, where: { UserId: user.id } })
            const membership = await Member.findAll({})
            res.status(200).json({
                movie,
                slider,
                favorite,
                popular,
                trending,
                sport,
                parallax,
                wishList,
                membership
            })
        } catch (error) {
            next(error)
        }
    }

    static async detail(req, res, next) {
        try {
            const { id } = req.params
            const reqUser = req.user
            const data = await Movie.findByPk(id)
            if (!data) {
                throw { name: 'MovieNotFound' }
            }
            const user = await User.findByPk(reqUser.id)
            const wishlist = await UserMovies.findOne({ where: { UserId: reqUser.id, MovieId: id } })
            res.status(200).json({
                data,
                user,
                wishlist
            })
        } catch (error) {
            next(error)
        }
    }

    static async wishList(req, res, next) {
        try {
            const { id } = req.params
            const reqUser = req.user
            const wishlist = await UserMovies.findAll({ where: { UserId: reqUser.id, MovieId: id } })
            if (wishlist.length === 0) {
                const create = await UserMovies.create({ UserId: reqUser.id, MovieId: id })
                res.status(201).json({
                    message: `${reqUser.username} you successfully added this movie to wishlist`
                })
            } else {
                const destroy = await UserMovies.destroy({ where: { UserId: reqUser.id, MovieId: id } })
                res.status(200).json({
                    message: 'Success remove movie from wishlist'
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async succesPay(req, res, next) {
        try {
            const user = req.user
            const { id } = req.params
            const member = await Member.findByPk(id)
            const update = await User.update({ MemberId: id }, { where: { id: user.id } })
            nodeMailer(user, member)
            res.status(200).json({
                message: "Success payment you have subscribed to Netflix"
            })
        } catch (error) {
            next(error)
        }
    }


    static async checkout(req, res, next) {
        const { id } = req.params
        const membership = await Member.findByPk(id)
        try {
            const user = req.user
            // if (user.MemberId) {
            //     throw { name: "AlreadySubs" }
            // }
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.SERVER_MIDTRANS
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_ID_" + Math.floor(9834134 + Math.random() * 4757975238),
                    "gross_amount": membership.price * 150
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "first_name": user.username.split(' ')[0],
                    "last_name": user.username.split(' ')[1],
                    "email": user.email,
                }
            };
            const midtrans_Token = await snap.createTransaction(parameter)
            res.status(201).json(midtrans_Token)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller