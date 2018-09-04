'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    userName: String,
    userPassword: String,
    userUpdateDate: Date,
    userUpdateUser: String,
    role: { type: Schema.ObjectId, ref: 'Role' }
});

module.exports = mongoose.model('User', userSchema);