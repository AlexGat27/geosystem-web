const express = require('express') //Модуль express
const controller = require('../controllers/auth') //Контроллер авторизации
const { authMiddleware } = require('../middleware/middleware') //Дополнительные middlewares
const router = express.Router() //Модуль роутера

//Отслеживание запросов по пути http://localhost:5000/api/auth/getUser
router.get('/getUser', authMiddleware, controller.getUser)

//Отслеживание запросов по пути http://localhost:5000/api/auth/deleteUser
router.get('/deleteUser', authMiddleware, controller.deleteUser)

//Отслеживание запросов по пути http://localhost:5000/api/auth/register
router.post('/register', controller.registerUser)

//Отслеживание запросов по пути http://localhost:5000/api/auth/login
router.post('/login', controller.login)

module.exports = router