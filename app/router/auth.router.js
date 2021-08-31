const AuthController = require('../controllers/auth.controller')
const Router = require('express').Router()


Router.post('/createaccount', AuthController.CreateAccount)
Router.post('/login', AuthController.Login)
Router.put('/verifyaccount', AuthController.ConfirmEmail)
// Router.post('/confirmphone', AuthController.ConfirmPhone)
module.exports = Router