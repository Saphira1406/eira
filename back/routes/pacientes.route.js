import express from 'express'
import * as PacientesController from '../controllers/pacientes.controller.js'
import { autenticacion } from '../middlewares/auth.middleware.js'

const route = express.Router()

/**
 *  Paciente
 *     x - traer
 *     x - eliminar
 *     x - editar
 *     x - traer por ID
 *     x - traer su historia clinica
 *     x - crear historia clinica
*/

route.get('/api/pacientes', PacientesController.traerTodos)
route.get('/api/pacientes/:id', [autenticacion], PacientesController.traerPorId)
route.get('/api/pacientes/:id/historia', [autenticacion], PacientesController.traerHistoriaClinica)
route.delete('/api/pacientes/:id', PacientesController.eliminar)
route.post('/api/pacientes/:id/historia-clinica', PacientesController.crearHistoriaClinica)
route.patch('/api/pacientes/:id', PacientesController.editar)

export default route