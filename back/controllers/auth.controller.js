import jwt from 'jsonwebtoken'
import * as UsuariosServices from '../services/auth.service.js'

function crear (req, res) {
    const usuario = req.body
    console.log(usuario)
  
    UsuariosServices.crear(usuario)
    .then(function (usuarioNuevo) {
        usuarioNuevo ?
        res.status(200).json({
            response: true,
            message: "Usuario creado"
        }) :
        res.status(500).json({mensaje: "No se pudo crear el usuario... intente de nuevo" })
    })
    .catch(function (err) {
        res.status(500).json({
            response: false,
            message: "Email ya existente.."
        })
    })
}

async function login (req, res) {
    return UsuariosServices.login(req.body)
    .then(usuario => {
        const token = jwt.sign(usuario, 'CLAVE_SECRETA_RED_SOCIAL')
        res.status(200).json({usuario,token})
    })
    .catch(err => res.status(500).json({
        mensaje: err.message
    }))
}

export {
    crear,
    login
}