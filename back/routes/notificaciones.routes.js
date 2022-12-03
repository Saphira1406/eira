import express from 'express'
import * as NotificacionMail from '../controllers/notificaciones.controller.js'

const route = express.Router()

route.post('/api/notificacion', NotificacionMail.enviarNotificacionMail)

export default route