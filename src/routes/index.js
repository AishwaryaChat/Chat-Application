const express = require('express')
const signupRoutes = require('./signupRoutes')
const loginRoutes = require('./loginRoutes')

const router = express.Router()

signupRoutes(router)
loginRoutes(router)

module.exports = router
