'use strict'

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// cargar rutasT
var userRoutes = require('./routes/userRoutes')
var roleRoutes = require('./routes/roleRoutes')
var permissionRoutes = require('./routes/permissionRoutes')
var projectRoutes = require('./routes/projectRoutes')

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// configurar cabeceras y cors
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
})

// rutas
app.use('/api/user', userRoutes)
app.use('/api/role', roleRoutes)
app.use('/api/permission', permissionRoutes)
app.use('/api/project', projectRoutes)

// configurar errores
app.use(function (err, req, res, next) {
    if (err) {
        console.log(err)
        res.status(err.status).send(err.message)
    }
})

module.exports = app