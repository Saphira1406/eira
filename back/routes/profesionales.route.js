import express from 'express'
import * as ProfesionalesController from '../controllers/profesionales.controller.js'
import { autenticacion, medicoVerificado, administrador } from '../middlewares/auth.middleware.js'

const route = express.Router()

route.get('/api/profesionales', [autenticacion], ProfesionalesController.traerTodos)
route.get('/api/profesionales/:id', ProfesionalesController.traerPorId)
route.patch('/api/profesionales/:id', [autenticacion], ProfesionalesController.editar)
route.delete('/api/profesionales/:id', [autenticacion], ProfesionalesController.eliminar)
route.get('/api/profesionales/:id/pacientes', [autenticacion, medicoVerificado], ProfesionalesController.traerPacientes)
route.delete('/api/profesionales/:idProfesional/pacientes/:idPaciente', [autenticacion, medicoVerificado], ProfesionalesController.eliminarPaciente)
route.patch('/api/profesionales/verificacion/:id', [autenticacion, administrador], ProfesionalesController.verificarMedico)
route.get('/api/recetas/:id', ProfesionalesController.traerPedidosRecetas)


export default route