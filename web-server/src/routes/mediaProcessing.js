const express = require('express')
const controller = require('../controllers/mediaProcessing')
const router = express.Router()
const multer = require('multer')
const {
    authMiddleware,
    fizMiddleware,
    enterpriseMiddleware
} = require('../middleware/middleware')

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//http://localhost:5000/api/v1/mediaProcessing/imageProcessing
router.post('/imageProcessing', upload.single("image"), authMiddleware, fizMiddleware, controller.imageProcessing)
// router.post('/imageProcessing', upload.single("image"), controller.imageProcessing)
module.exports = router