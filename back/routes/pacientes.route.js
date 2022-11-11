import express from 'express'
import * as PacientesController from '../controllers/pacientes.controller.js'

const route = express.Router()

route.get('/api/pacientes', PacientesController.traerTodos)
route.get('/api/pacientes/:id', PacientesController.traerPorId)
route.get('/api/pacientes/:id/historia', PacientesController.traerHistoriaClinica)
//route.post('/api/tratamientos', TratamientosController.crear)

export default route