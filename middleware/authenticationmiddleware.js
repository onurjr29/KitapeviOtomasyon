const jwt = require('jsonwebtoken')

function authenticationToken(req, res, next) {
    const token = req.cookies.token
    if(token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token, 'rdj', (error, email) => {
        if(error) throw error
        req.email = email
        next()
    })
}

module.exports = {authenticationToken}