'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/admin-dailyn', { useMongoClient: true })
    .then(() => {        
        console.log('La conexión DB correcta...');
        app.listen(port, () => {
            console.log('El servidor nodeJS esta correindo...');
        });
    })
    .catch(err => console.log(err));