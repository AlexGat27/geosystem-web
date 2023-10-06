const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

//http://localhost:5000/api/auth/getUsualUsers
router.get('/getUsualUsers', controller.getUsualUsers)

//http://localhost:5000/api/auth/getEnterpriseUsers
router.get('/getEnterpriseUsers', controller.getEnterpriseUsers)

//http://localhost:5000/api/auth/registerEnterpriseUser
router.post('/registerEnterpriseUser', controller.registerEnterpriseUser)

//http://localhost:5000/api/auth/registerUsualUser
router.post('/registerUsualUser', controller.registerUsualUser)

module.exports = router