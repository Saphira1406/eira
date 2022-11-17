import * as UsuariosServices from '../services/auth.service.js'

async function login (req, res) {
    return UsuariosServices.login(req.body)
    .then(usuario => {
        usuario ?
        res.status(200).json(usuario) :
        res.status(500).json({mensaje: "Hubo un error al loguearse... intente de nuevo" })
    })
    .catch(err => res.status(500).json({
        mensaje: err.message
    }))
}

export {
    login
}