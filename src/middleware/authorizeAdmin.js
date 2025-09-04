const authorizeAdmin = (req, res, next) => {
    const user = req.user
    if (!user || user.role !== 'admin') {
        return res.status(401).send('Acceso denegado, solo Administrador')
    }
    next()
}

module.exports = authorizeAdmin