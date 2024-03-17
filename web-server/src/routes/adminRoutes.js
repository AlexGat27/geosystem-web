const express = require('express')
const controller = require('../controllers/adminCtrl')
const router = express.Router()

router.post('/login', controller.login);
router.post('/mediaProcessing', controller.mediaProcessing);

module.exports = router