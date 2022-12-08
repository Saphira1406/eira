import express from 'express'
import * as ProfesionalesController from '../controllers/profesionales.controller.js'

const route = express.Router()

route.get('/api/profesionales', ProfesionalesController.traerTodos)
route.get('/api/profesionales/:id', ProfesionalesController.traerPorId)
route.patch('/api/profesionales/:id', ProfesionalesController.editar)
route.delete('/api/profesionales/:id', ProfesionalesController.eliminar)
route.get('/api/profesionales/:id/pacientes', ProfesionalesController.traerPacientes)
route.delete('/api/profesionales/:idProfesional/pacientes/:idPaciente', ProfesionalesController.eliminarPaciente)
route.patch('/api/profesionales/verificacion/:id', ProfesionalesController.verificarMedico)


export default route