import express from 'express'
import * as UsuariosController from '../controllers/auth.controller.js'

const route = express.Router()

route.post('/api/login', UsuariosController.login)

export default route