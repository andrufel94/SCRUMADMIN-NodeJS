'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'secret_key_admin_dailyn_extra_software'

function createToken (user){
    var payload = {
        sub: user._id,
        userName: user.userName,
        userRole: user.role.roleName,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, secret)
}

function decodeToken(token){
    try{
        var payload = jwt.decode(token, secret)
        return payload
    } catch(err){
        return err.message
    }
    
}

module.exports = {
    createToken,
    decodeToken
}