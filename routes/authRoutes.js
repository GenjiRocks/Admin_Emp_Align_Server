const express = require('express')
const { register, login } = require('../controller/authController')
const router = express.Router()

//Registering the User
router.post('/register', register)

//logging in the user
router.post('/login', login)


module.exports = router;
