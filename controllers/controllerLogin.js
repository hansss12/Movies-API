const { User } = require('../models')
const { comparePassword, createToken } = require('../helper/auth')
const { OAuth2Client } = require('google-auth-library');

class loginController {
    static async gettingStart(req, res, next) {
        try {
            const { email } = req.body
            res.status(200).json({
                message: 'Success',
                email
            })
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const user = await User.create({ username, email, password })
            res.status(201).json({
                message: 'Success Register',
                username,
                email,
                role: user.role
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw { name: 'login null' }
            }
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: 'Invalid Login' }
            }
            const verify = comparePassword(password, user.password)
            if (!verify) {
                throw { name: 'Invalid Login' }
            }

            const payload = {
                id: user.id,
            }
            const access_token = createToken(payload)
            res.status(200).json({
                message: 'Success login',
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async google(req, res, next) {
        try {
            const googleToken = req.headers.googletoken
            const client = new OAuth2Client("865795531816-9s3rn6nslv5j1gdu1jojkcbg37gp5j2j.apps.googleusercontent.com");
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: "865795531816-9s3rn6nslv5j1gdu1jojkcbg37gp5j2j.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "googlelogin",
                },
                hooks: false
            });
            const accessToken = createToken({
                id: user.id
            })
            res.status(200).json({
                message: 'Success Login',
                accessToken
            })
            if (created) {
                res.status(200).json({
                    message: 'Success Login',
                    accessToken
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = loginController