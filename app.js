if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { urlencoded } = require('express')
const { errorHandler } = require('./middlewares/errorHandler')
const express = require('express')
const router = require('./routes')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})