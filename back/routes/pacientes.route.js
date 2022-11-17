import express from 'express'
import * as PacientesController from '../controllers/pacientes.controller.js'

const route = express.Router()

route.get('/api/pacientes', PacientesController.traerTodos)
route.get('/api/pacientes/:id', PacientesController.traerPorId)
route.get('/api/pacientes/:id/historia', PacientesController.traerHistoriaClinica)
route.delete('/api/pacientes/:id', PacientesController.eliminar)
route.post('/api/pacientes/:id/historia-clinica', PacientesController.crearHistoriaClinica)
route.patch('/api/pacientes/:id', PacientesController.editar)
//route.post('/api/tratamientos', TratamientosController.crear)

export default route