//Роутер для перессылки запросов на обработку фото

const express = require('express') //Модуль express
const controller = require('../controllers/mediaProcessing') //Контроллер обработки фото
const router = express.Router() //Модуль роутера
const multer = require('multer') //Модуль для обработки multipart/form-data
const {
    authMiddleware,
    fizMiddleware,
    enterpriseMiddleware
} = require('../middleware/middleware') //Дополнительные middlewares

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//Отслеживание запросов по пути http://localhost:5000/api/v1/mediaProcessing/imageProcessing
router.post('/imageProcessing', upload.single("image"), authMiddleware, fizMiddleware, controller.imageProcessing)
module.exports = router