'use strict'

var express = require('express')
var userController = require('../controllers/userController')
var constants = require('../common/constants')

var mdAuth = require('../middlewares/authenticatedMd')
var mdPermission = require('../middlewares/permissionedMd')
var api = express.Router()

api.get('/pruebas', [mdAuth.ensureAuth, mdPermission.validatedPermision], userController.pruebas)
api.post('/register', userController.saveUser)
api.post('/login', userController.login)
api.post('/create', userController.createUser)

module.exports = api