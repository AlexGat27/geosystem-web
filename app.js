const express = require('express')
const authRouter = require('./routes/auth')
const bodyParser = require('body-parser')
const db = require('./models')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)

module.exports = app