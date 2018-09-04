'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = Schema({
    taskName: String,
    taskDescription: String,
    taskChildren: [{ type: Schema.ObjectId, ref: 'Task' }],
    taskUserAssigned: { type: Schema.ObjectId, ref: 'User' },
    taskRealTime: Date,
    taskEstimatedTime: Date,
    taskUpdateDate: Date,
    taskUpdateUser: String
});

module.exports = mongoose.model('Task', taskSchema);