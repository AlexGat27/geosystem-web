const express = require('express')
const controller = require('../controllers/auth')
const { authMiddleware } = require('../middleware/middleware')
const router = express.Router()

//http://localhost:5000/api/auth/getUsualUsers
router.get('/getUser', authMiddleware, controller.getUser)

//http://localhost:5000/api/auth/clearTable
// router.get('/clearTableUser', controller.clearTableUser)

// //http://localhost:5000/api/auth/register
router.post('/register', controller.registration)

// //http://localhost:5000/api/auth/login
router.post('/login', controller.login)

module.exports = router