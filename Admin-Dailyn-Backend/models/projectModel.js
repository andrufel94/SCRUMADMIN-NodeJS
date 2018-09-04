'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema({
    projectName: String,
    projectDescription: String,
    projectUpdateDate: Date,
    projectUpdateUser: String,
    projectEnable: Boolean,
    usersOwners: [{ type: Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Project', projectSchema);