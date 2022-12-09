import express from 'express'
import { autenticacion } from '../middlewares/auth.middleware.js'
import * as ChatController from '../controllers/chat.controller.js'

const route = express.Router()

/**
 *  Chat
 *    - crear chat
 *
 *  */
route.post('/api/chat', ChatController.crear)
route.get('/api/chat/:usuarioId', ChatController.traerPorUsuarioId) // trae los chats donde se encuentre el id usuario
route.get('/api/chat/:usuarioId1/:usuarioId2', ChatController.traerUno) 

export default route