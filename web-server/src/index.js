//Запуск сервера express и прослушивание на соответствующих портах
const express = require('express') //Модуль express
const authRouter = require('./routes/auth') //Роутер авторизации
const mapRouter = require('./routes/map') //Роутер карты
const mediaRouter = require('./routes/mediaProcessing') //Роутер обработки фото
const bodyParser = require('body-parser') //Модуль для передачи json файлов и их раскодирования

const app = express()

//Добавление промежуточного ПО
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// app.use(express.static('client-static'));
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/map', mapRouter)
app.use('/api/v1/mediaProcessing', mediaRouter)

//Инициализация порта и хоста
const port = 5000;
const hostname = "0.0.0.0";

//Запуск приложения
app.listen(port,hostname, () => {console.log('Server has been started')})
