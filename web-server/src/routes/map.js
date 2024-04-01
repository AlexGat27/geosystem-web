const express = require('express') //Модуль express
const controller = require('../controllers/map') //Контроллер карты
const router = express.Router() //Модуль роутера
const {
    authMiddleware,
    fizMiddleware,
    enterpriseMiddleware
} = require('../middleware/middleware') //Дополнительные middlewares

//Отслеживание запросов по пути http://localhost:5000/api/auth/getPotholes
router.get('/getPotholes', authMiddleware, fizMiddleware, controller.getPotholes)
//Отслеживание запросов по пути http://localhost:5000/api/auth/deleteAllPotholes
router.delete('/deleteAllPotholes', authMiddleware, fizMiddleware, controller.deleteAllPotholes)

module.exports = router