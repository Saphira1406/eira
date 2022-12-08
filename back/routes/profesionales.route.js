import express from 'express'
import * as ProfesionalesController from '../controllers/profesionales.controller.js'
import { autenticacion } from '../middlewares/auth.middleware.js'
import { verificarMedico } from '../services/profesionales.service.js'

const route = express.Router()

route.get('/api/profesionales', ProfesionalesController.traerTodos)
route.get('/api/profesionales/:id', ProfesionalesController.traerPorId)
route.patch('/api/profesionales/:id', [autenticacion], ProfesionalesController.editar)
route.delete('/api/profesionales/:id', [autenticacion], ProfesionalesController.eliminar)
route.get('/api/profesionales/:id/pacientes', [autenticacion, verificarMedico], ProfesionalesController.traerPacientes)
route.delete('/api/profesionales/:idProfesional/pacientes/:idPaciente', [autenticacion, verificarMedico], ProfesionalesController.eliminarPaciente)
route.patch('/api/profesionales/verificacion/:id', [autenticacion], ProfesionalesController.verificarMedico)


export default route