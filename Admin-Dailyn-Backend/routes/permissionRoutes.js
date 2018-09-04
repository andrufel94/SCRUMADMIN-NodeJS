'use strict'

var express = require('express')
var permissionController = require('../controllers/permissionController')

var api = express.Router()

api.post('/register', permissionController.registerPermission)

module.exports = api