import express from 'express'
import * as UsuariosController from '../controllers/usuarios.controller.js'

const route = express.Router()

route.patch('/api/usuarios/olvideContrasena', UsuariosController.olvideContrasena)
route.patch('/api/usuarios/:token/:email', UsuariosController.recuperarContrasena)

export default route