'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = Schema({
    roleName: String,
    roleDescription: String
});

module.exports = mongoose.model('Role', roleSchema);