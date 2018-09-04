'use strict'

// Modelos
var Project = require('../models/projectModel')
var mongoose = require('mongoose');

// Metodos publicos
function registerProject(req, res) {
    var project = new Project()
    var params = req.body
    var isValid = (validateProject(params))
    var usersOwners = []

    if (isValid.length <= 0) {
        usersOwners = params.usersOwners

        project.projectName = params.projectName
        project.projectDescription = params.projectDescription
        project.projectUpdateUser = new Date()
        project.projectUpdateUser = req.user.userName
        project.usersOwners = usersOwners
        project.projectEnable = (!params.projectEnable) ? true : params.projectEnable

        Project.findOne({ projectName: params.projectName }).exec((err, projectFind) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar projectos' })
            } else {
                if (projectFind) {
                    res.status(500).send({ message: 'El proyecto ya existe' })
                } else {
                    project.save((err, projectStored) => {
                        if (err) {
                            res.status(500).send({ message: 'Error al guardar el proyecto' })
                        } else {
                            if (!projectStored) {
                                res.status(500).send({ message: 'Error al guardar el proyecto' })
                            } else {
                                res.status(200).send({ project: projectStored })
                            }
                        }
                    })
                }
            }
        })
    } else {
        var msgError = ''
        isValid.forEach(err => {
            msgError += err + ','
        })
        res.status(500).send({ message: 'Error: ' + msgError })
    }
}

function listProject(req, res) {
    var userId = (req.user.sub)
    var filter = { usersOwners: userId };
    if (req.user.isAdmin) {
        filter = {};
    }

    Project.find(filter).populate({ path: 'usersOwners', populate: { path: 'role' } }).exec((err, ListProjects) => {
        if (err) {
            res.status(500).send({ message: 'Error al obtener lista de proyectos' })
        } else {
            if (ListProjects) {
                var List1 = ListProjects
                for (var i = 0; i < List1.length; i++) {
                    var userTransform = List1[i].usersOwners.map(user => ({ _id: user._id, userName: user.userName }))
                    List1[i].usersOwners = userTransform
                }

                res.status(200).send({ projects: List1 })
            }
        }
    })
}

function updateProject(req, res) {
    var project = {}
    var userId = (req.user.sub)
    var params = req.body
    var projectId = params.projectId
    // var projectId = mongoose.Types.ObjectId(params.projectId)
    var isValid = (validateProject(params))
    var filter = { _id: projectId, usersOwners: userId };
    if (req.user.isAdmin) {
        filter = { _id: projectId };
    }

    if (isValid.length <= 0) {
        project.projectName = params.projectName
        project.projectDescription = params.projectDescription
        project.projectUpdateUser = new Date()
        project.projectUpdateUser = req.user.userName
        project.usersOwners = params.usersOwners
        project.projectEnable = (params.projectEnable == null) ? true : params.projectEnable

        Project.updateOne(filter, project, (err, projectUpdated) => {
            if (err) {
                res.status(500).send({ message: 'Error al actualizar el proyecto ' + err })
            } else {
                if (projectUpdated == null || projectUpdated.n <= 0) {
                    res.status(500).send({ message: 'No existe el proyecto o no tiene permisos para actualizar' })
                } else {
                    res.status(200).send({ res: projectUpdated })
                }
            }
        })
    } else {
        var msgError = ''
        isValid.forEach(err => {
            msgError += err + ','
        })
        res.status(500).send({ message: 'Error: ' + msgError })
    }
}

// Metodos privados
function validateProject(params) {
    var errors = []

    if (!params.projectName) {
        errors.push('Nombre del proyecto es obligatorio')
    }
    if (!params.projectDescription) {
        errors.push('Descripción del proyecto es obligatorio')
    }
    if (params.usersOwners) {
        if (params.usersOwners.length < 1) {
            errors.push('Usuarios responsables son obligatorios')
        }
    } else {
        errors.push('Usuarios responsables son obligatorios')
    }

    return errors
}

module.exports = {
    registerProject,
    listProject,
    updateProject
}