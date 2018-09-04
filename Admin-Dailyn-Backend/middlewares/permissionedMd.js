'use strict'
var permissionController = require('../controllers/permissionController')
var Permission = require('../models/permissionModel')

exports.validatedPermision = function (req, res, next) {
    var permissionRoles = null
    var originalUrl = null
    var urlController = null
    var urlAction = null

    originalUrl = (req.originalUrl.split('/'))
    urlAction = originalUrl[originalUrl.length - 1]
    urlController = originalUrl[originalUrl.length - 2]
    if (urlAction.includes("?")) {
        urlAction = urlAction.substring(0, urlAction.indexOf("?"))
    }
    // Consultar permisos
    Permission.findOne({ permissionName: urlController, permissionActionName: urlAction })
        .populate('permissionRoles').exec((err, permissionFind) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar permisos' })
            } else {
                if (permissionFind) {
                    permissionRoles = permissionFind.permissionRoles.map(a => a.roleName)
                    // Determinar si el role del usuario tiene permisos                    
                    if (permissionRoles.indexOf(req.user.userRole) >= 0) {
                        next()
                    }
                    else {
                        res.status(500).send({ message: 'No tiene permisos para ejecutar esta acción' })
                    }
                } else {
                    res.status(500).send({ message: 'Error al comprobar permisos' })
                }
            }
        })
}