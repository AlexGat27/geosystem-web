const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

router.get('/getUsers', controller.getUsers)

module.exports = router