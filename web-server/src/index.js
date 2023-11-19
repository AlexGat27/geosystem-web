const express = require('express')
const authRouter = require('./routes/auth')
const mapRouter = require('./routes/map')
const mediaRouter = require('./routes/mediaProcessing')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/map', mapRouter)
app.use('/api/v1/mediaProcessing', mediaRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {console.log('Server has been started')})
