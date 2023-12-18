const express = require('express')
const controller = require('../controllers/map')
const router = express.Router()
const {
    authMiddleware,
    fizMiddleware,
    enterpriseMiddleware
} = require('../middleware/middleware')

//http://localhost:5000/api/auth/getPotholes
router.get('/getPotholes', authMiddleware, fizMiddleware, controller.getPotholes)
router.delete('/deleteAllPotholes', authMiddleware, fizMiddleware, controller.deleteAllPotholes)

module.exports = router