import express from 'express'
import { autenticacion } from '../middlewares/auth.middleware.js'
import * as ConexionesController from '../controllers/conexiones.controller.js'

const route = express.Router()

/**
 *  Seguidores
 *     x - traer por usuario
 *
 */

route.get('/api/conexiones/:idUsuario', ConexionesController.traerPorUsuario)
//route.post('/api/seguir',[autenticacion], SeguidoresController.seguir)
//route.get('/api/seguidores', [autenticacion],SeguidoresController.traerTodos)

export default route