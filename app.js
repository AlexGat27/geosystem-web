const express = require('express')
const authRouter = require('./routes/auth')
const db = require('./db')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(db)

app.use('/api/auth', authRouter)

module.exports = app