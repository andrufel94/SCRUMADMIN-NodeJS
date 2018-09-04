'use strict'
// Modulos
var bcrypt = require('bcrypt-nodejs')

// Modelos
var User = require('../models/userModel')

// Servicios
var jwt = require('../services/jwt')

// Metodos publicos
function pruebas(req, res) {
    res.status(200).send({
        user: req.user
    })
}

async function saveUser(req, res) {
    var user = new User()
    var params = req.body
    var isValid = (await validateUser(params, false))

    if (isValid.length <= 0) {
        user.userName = params.userName
        user.userUpdateDate = new Date()
        user.userUpdateUser = params.userUpdateUser
        user.role = params.role

        bcrypt.hash(params.userPassword, null, null, function (err, hash) {
            user.userPassword = hash
            user.save((err, userStored) => {
                if (err) {
                    res.status(500).send({ message: 'Error al guardar el usuario' })
                } else {
                    if (!userStored) {
                        res.status(404).send({ message: 'No se ha guardado el usuario' })
                    } else {
                        res.status(500).send({ user: userStored })
                    }
                }
            })
        })
    } else {
        var msgError = ''
        isValid.forEach(err => {
            msgError += err + ','
        })
        res.status(500).send({ message: 'Error: ' + msgError })
    }
}

async function login(req, res) {
    var params = req.body
    var isValid = (await validateUser(params, true))

    if (isValid.length <= 0) {
        var userName = params.userName
        var userPassword = params.userPassword

        User.findOne({ userName: userName }).populate('role').exec((err, userFind) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar el usuario' })
            } else {
                if (userFind) {
                    bcrypt.compare(userPassword, userFind.userPassword, (err, check) => {
                        if (check) {
                            var token = jwt.createToken(userFind)
                            res.status(200).send({ token: token })
                        } else {
                            res.status(500).send({ message: 'Error al comprobar el usuario' })
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
        res.status(500).send({ message: 'Error al validar el usuario: ' + msgError })
    }
}

// Metodo privados
async function validateUser(params, isLogin) {
    var errors = []
    var userCount = 0
    // var user = new User()

    if (!params.userPassword) {
        errors.push('La contraseña es obligatoria')
    }
    if (!params.userName) {
        errors.push('El nombre es obligatorio')
    }
    else if (!isLogin) {

        (await User.find({ userName: params.userName }, (err, userFind) => {
            if (err) {
                errors.push('Error al comprobar el usuario')
            }
            else {
                if (userFind.length > 0) {
                    errors.push('El usuario ya existe')
                }
            }
        }))
    }
    if (!isLogin) {
        if (!params.userUpdateUser) {
            errors.push('El usuario auditor es obligatorio')
        }
        if (!params.role) {
            errors.push('El role es obligatorio')
        }
    }

    return errors
}

function getModel() {
    return require('../daos/userDataStore');
    // return require(`./user-${require('../config').get('DATA_BACKEND')}`);
}

// Metodos crud datastore
function createUser(req, res, next) {
    var data = req.body;
    console.log(data);

    getModel().create(data, (err, savedData) => {
        if (err) {
            next(err);
            return;
        }
        console.log(savedData);
    });
}

module.exports = {
    pruebas,
    saveUser,
    login,
    createUser
}