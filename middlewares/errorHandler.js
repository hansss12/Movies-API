const errorHandler = (error, req, res, next) => {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeForeignKeyConstraintError') {
        const errors = error.errors[0].message
        res.status(400).json({
            message: errors
        })
    } else if (error.name === 'Invalid token' || error.name === 'JsonWebTokenError') {
        res.status(401).json({
            message: "Invalid Token"
        })
    } else if (error.name === 'Invalid Login') {
        res.status(401).json({
            message: "Invalid Email or Password"
        })
    } else if (error.name === 'login null') {
        res.status(400).json({
            message: 'Email/Password cannot empty'
        })
    } else if (error.name === 'Unauthorize') {
        res.status(403).json({
            message: 'You dont have access to this Feature'
        })
    } else if (error.name === 'MovieNotFound') {
        res.status(404).json({
            message: "Movie not found!"
        })
    } else if (error.name === 'DetailEmpty') {
        res.status(400).json({
            message: 'Please fill the input'
        })
    } else if (error.name === 'CardEmpty') {
        res.status(400).json({
            message: 'Please register your card in membership first'
        })
    } else if (error.name === 'CardExist') {
        res.status(400).json({
            message: "You already have Card you can't register a new card"
        })
    } else if (error.name === 'MembershipNotFound') {
        res.status(404).json({
            message: "Membership not found"
        })
    } else if (error.name === 'UserNotFound') {
        res.status(404).json({
            message: "User not found"
        })
    } else if (error.name === 'InvalidCVV') {
        res.status(400).json({
            message: "Invalid CVV Information"
        })
    } else if (error.name === 'InvalidCard') {
        res.status(400).json({
            message: "Invalid Card Information"
        })
    } else if (error.name === 'AlreadySubs') {
        res.status(400).json({
            message: "You Already subscribed to Netflix"
        })
    } else {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = { errorHandler }