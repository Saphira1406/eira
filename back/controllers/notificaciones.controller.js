import * as NotificacionMail from '../services/mail.services.js'

function enviarNotificacionMail(req, res) {

    console.log(req.body)
    NotificacionMail.enviarNotificacionMail(req.body.email)
    .then((resp) => {
        resp ? res.status(200).json({response: true, message: "Se envió el correo"}) :
        res.status(404).json({
            response: false,
            message: "Hubo un error" //aaca
        })
    })
}

export {
    enviarNotificacionMail
}