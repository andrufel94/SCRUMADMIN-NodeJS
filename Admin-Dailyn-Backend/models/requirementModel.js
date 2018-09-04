'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requirementSchema = Schema({
    requirementName: String,
    requirementDescription: String,
    requirementProject: { type: Schema.ObjectId, ref: 'Project' },
    requirementUserAssigned: { type: Schema.ObjectId, ref: 'User' },
    requirementUpdateDate: Date,
    requirementUpdateUser: String
});

module.exports = mongoose.model('Requirement', requirementSchema);