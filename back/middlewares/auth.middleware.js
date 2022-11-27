import jwt from 'jsonwebtoken'

function autenticacion(req, res, next) {
    try {
        const token = req.headers['autenticacion']
        let usuario = jwt.verify(token, 'CLAVE_SECRETA_RED_SOCIAL')
        next()
    }
    catch (err) {
        res.status(401).json({
            mensaje: 'No tiene permisosss'
        })
    }
}

export {
    autenticacion
}