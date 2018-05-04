const express = require('express')
const router = express.Router()

module.exports = router

router.use('/auth', require('./auth'))
router.use('/student', require('./student'))
