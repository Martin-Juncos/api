const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(403).send('Token requerido')
    }
    jwt.verify(token.split(' ')[1], 'mySecretKey', (err, decode) => {
        if (err) {
            return res.status(401).send('Token invalido')
        }
        req.user = decode
        next()
    } )    
}

module.exports = verifyToken