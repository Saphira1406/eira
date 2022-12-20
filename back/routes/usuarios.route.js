import express from 'express'
import * as UsuariosController from '../controllers/usuarios.controller.js'

const route = express.Router()

route.patch('/api/usuarios/olvideContrasena', UsuariosController.olvideContrasena)
route.patch('/api/usuarios/:token/:email', UsuariosController.recuperarContrasena)
route.patch('/api/usuarios/:token/:email', UsuariosController.recuperarContrasena)
route.get('/api/usuarios/:idUsuario', UsuariosController.traerProfesionalesVinculados)
route.post('/api/usuarios/profesional/:idProfesional', UsuariosController.agregarProfesional)

export default route