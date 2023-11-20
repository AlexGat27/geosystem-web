const express = require('express')
const controller = require('../controllers/mediaProcessing')
const router = express.Router()
const {
    authMiddleware,
    fizMiddleware,
    enterpriseMiddleware
} = require('../middleware/middleware')

//http://localhost:5000/api/v1/mediaProcessing/imageProcessing
// router.post('/imageProcessing', authMiddleware, fizMiddleware, controller.imageProcessing)
router.post('/imageProcessing', controller.imageProcessing)
module.exports = router