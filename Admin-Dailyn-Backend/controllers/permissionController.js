'use strict'

// Modelos
var Permission = require('../models/permissionModel')

async function getPermission(permissionId, permissionActionId) {
    (await Permission.findOne({ permissionId: permissionId, permissionActionId: permissionActionId })
        .populate('permissionRoles').exec((err, permissionFind) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar permisos' })
            } else {
                if (permissionFind) {
                    return permissionFind
                }
            }
        }))
}
// Metodos publicos
function registerPermission(req, res) {
    var permission = new Permission()
    var params = req.body
    var isValid = (validatePermission(params))
    var permissionRoles = []

    if (isValid) {
        permissionRoles = params.permissionRoles

        if(permissionRoles.length < 1){
            permissionRoles.push('5a5ad91d8c94110e187199b9') // Default ADMIN
        }

        permission.permissionId = params.permissionId
        permission.permissionName = params.permissionName
        permission.permissionActionId = params.permissionActionId
        permission.permissionActionName = params.permissionActionName
        permission.permissionUpdateUser = params.permissionUpdateUser
        permission.permissionUpdateDate = new Date()
        permission.permissionRoles = permissionRoles

        Permission.findOne({ permissionId: params.permissionId, permissionActionId: params.permissionActionId })
            .populate('permissionRoles').exec((err, permissionFind) => {
                if (err) {
                    res.status(500).send({ message: 'Error al comprobar permisos' })
                } else {
                    if (permissionFind) {
                        res.status(500).send({ message: 'El permiso ya existe' })
                    } else {
                        permission.save((err, permissionStored) => {
                            if(err){
                                res.status(500).send({ message: 'Error al guardar el permiso, ' + err })
                            }else{
                                if(!permissionStored){
                                    res.status(500).send({ message: 'Error al guardar el permiso' })
                                }else{
                                    res.status(200).send({ permission: permissionStored })
                                }
                            }
                        })
                    }
                }
            })
    }
    else {
        var msgError = ''
        isValid.forEach(err => {
            msgError += err + ','
        })
        res.status(500).send({ message: 'Error al validar el permiso: ' + msgError })
    }
}

// Metodos privados
function validatePermission(params) {
    var errors = []

    if (!params.permissionId) {
        errors.push('Id Permiso es obligatorio')
    }
    if (!params.permissionName) {
        errors.push('Nombre del permiso es obligatorio')
    }
    if (!params.permissionActionId) {
        errors.push('Id Acción es obligatorio')
    }
    if (!params.permissionActionName) {
        errors.push('Nombre de la acción es obligatorio')
    }
    if (!params.permissionUpdateUser) {
        errors.push('El usuario auditor es obligatorio')
    }

    return errors
}

module.exports = {
    registerPermission
}