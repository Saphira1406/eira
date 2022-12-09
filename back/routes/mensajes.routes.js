import express from 'express'
import { autenticacion } from '../middlewares/auth.middleware.js'
import * as MensajesController from '../controllers/mensajes.controller.js'

const route = express.Router()

/**
 *  Chat
 *    - crear mensaje
 *    - traer mensajes por chat id
 *
 *  */
route.post('/api/mensajes', MensajesController.enviar)
route.get('/api/mensajes/:chatId', MensajesController.traer)

export default route