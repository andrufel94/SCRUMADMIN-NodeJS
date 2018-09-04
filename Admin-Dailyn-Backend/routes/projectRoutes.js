'use strict'
var express = require('express')
var projectController = require('../controllers/projectController')

var mdAuth = require('../middlewares/authenticatedMd')
var mdPermission = require('../middlewares/permissionedMd')
var api = express.Router()

api.post('/registerProject', [mdAuth.ensureAuth, mdPermission.validatedPermision], projectController.registerProject)
api.get('/listProject', [mdAuth.ensureAuth, mdPermission.validatedPermision], projectController.listProject)
api.put('/updateProject', [mdAuth.ensureAuth, mdPermission.validatedPermision], projectController.updateProject)

module.exports = api