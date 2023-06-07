const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY)
}

const verify = (payload) => {
    return jwt.verify(payload, process.env.SECRET_KEY)
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    createToken,
    verify,
    comparePassword
}