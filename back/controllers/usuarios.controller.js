import * as UsuariosServices from '../services/usuarios.service.js'
import { ObjectId } from 'mongodb'
import * as MailServices from '../services/mail.service.js'

function olvideContrasena (req ,res) {
    const email = req.body.email
    const token = Math.random().toString(16).substring(2, 16);
    UsuariosServices.olvideContrasena(email, token)
    .then((usuarioEditado) => {
        if(usuarioEditado.modifiedCount !== 0 ) {
            MailServices.enviarToken(email, token)
            res.status(200).json({response: true, message: "Se envió el mail", usuarioEditado})
        } else {
            res.status(404).json({
                response: false,
                message: "El email ingresado no existe"
            })
        }
    })
    .catch(err => {
        res.status(500).json({message: "Ocurrió un error al crear el token", err})
    })
}

function recuperarContrasena(req, res) {
    const token = req.params.token
    const email = req.params.email
    const password = req.body.password
    UsuariosServices.recuperarContrasena(email, token, password)
    .then((usuarioEditado) => {
        if(usuarioEditado !== false) {
            MailServices.contrasenaRecuperada(email)
            res.status(200).send({response: true, message: "Se recuperó la contraseña", usuarioEditado})
        } else {
            res.status(500).send({response: false, message: "Este link ya fue usado para recuperar la contraseña"})
        }
    })
    .catch(err => {
        res.status(500).send({message: "Ocurrió un error al recupeara la contraseña", err})
    })
}

export {
    olvideContrasena,
    recuperarContrasena
}