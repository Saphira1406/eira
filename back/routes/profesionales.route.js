import express from 'express'
import * as ProfesionalesController from '../controllers/profesionales.controller.js'

const route = express.Router()

route.get('/api/profesionales', ProfesionalesController.traerTodos)
route.get('/api/profesionales/:id', ProfesionalesController.traerPorId)
route.patch('/api/profesionales/:id', ProfesionalesController.editar)


export default route