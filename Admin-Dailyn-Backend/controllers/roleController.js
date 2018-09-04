'use strict'
// Modulos

// Modelos
var Role = require('../models/roleModel')

// Metodos
function saveRole(req, res) {
    var role = new Role()
    var params = req.body
    var isValidRole = validateRole(params)

    if (isValidRole.length <= 0) {
        role.roleName = params.roleName

        Role.findOne({ roleName: role.roleName }, (err, roleFind) => {
            if (err) {
                error.push('Error al comprobar el perfil')
            } else {
                if (roleFind) {
                    error.push('El perfil ya existe')
                } else {
                    role.save((err, roleStored) => {
                        if (err) {
                            res.status(500).send({ message: 'Error al guardar el perfil' })
                        } else {
                            if (!roleStored) {
                                res.status(500).send({ message: 'Error al guardar el perfil' })
                            } else {
                                res.status(200).send({ role: roleStored })
                            }
                        }
                    })
                }
            }
        })
    } else {
        var msgError = ''
        isValidRole.forEach(err => {
            msgError += err + ','
        })
        res.status(500).send({ message: 'Error al validar el perfil: ' + msgError })
    }
}

// Metodos privados
function validateRole(params) {
    var error = []

    if (!params.roleName) {
        error.push('El nombre del perfil es obligatorio')
    }
    if (!params.roleDescription) {
        error.push('La descripción del perfil es obligatorio')
    }

    return error
}

module.exports = {
    saveRole
}