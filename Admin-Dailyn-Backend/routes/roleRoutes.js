'use strinct'
// Modulos
var express = require('express');
var roleController = require('../controllers/roleController');

var api = express.Router();

// Rutas
api.post('/register', roleController.saveRole);

module.exports = api;