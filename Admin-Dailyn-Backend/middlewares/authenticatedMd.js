'use strict'
var jwt = require('../services/jwt')
var moment = require('moment')

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(500).send({ message: 'La petición no tiene cabecera' })
    }

    var token = req.headers.authorization.replace(/['"]+/g, '')
    var payload = jwt.decodeToken(token)
    if (!payload.userName) {
        return res.status(500).send({ message: payload })
    }
    else {
        req.user = payload
        if (req.user.userRole == 'ADMIN') {
            req.user.isAdmin = true;
        } else {
            req.user.isAdmin = false;
        }

        next()
    }
}