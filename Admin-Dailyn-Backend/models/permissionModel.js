'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionSchema = Schema({
    permissionId: Number,
    permissionName: String,
    permissionActionId: Number,
    permissionActionName: String,
    permissionRoles: [{ type: Schema.ObjectId, ref: 'Role' }],
    permissionUpdateDate: Date,
    permissionUpdateUser: String
});

module.exports = mongoose.model('Permission', permissionSchema);