const express = require('express')
const authRouter = require('./routes/auth')
const mapRouter = require('./routes/map')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)
app.use('/api/map', mapRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {console.log('Server has been started')})
