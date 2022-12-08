import express from 'express'
import * as TratamientosController from '../controllers/tratamientos.controller.js'
import { verificarMedico } from '../services/profesionales.service.js'

const route = express.Router()

route.get('/api/tratamientos', [autenticacion], TratamientosController.traerTodos)
route.get('/api/tratamientos/paciente/:id', [autenticacion], TratamientosController.traerPorIdPaciente)
route.get('/api/tratamientos/profesional/:idProfesional/paciente/:idPaciente', [autenticacion], TratamientosController.traerPorIdProfesional)
route.get('/api/tratamientos/:id', [autenticacion], TratamientosController.traerPorId)
route.post('/api/tratamientos', [autenticacion, verificarMedico], TratamientosController.crear)
route.delete('/api/tratamientos/:id', [autenticacion, verificarMedico], TratamientosController.eliminar)
route.patch('/api/tratamientos/:id', [autenticacion, verificarMedico], TratamientosController.editarMedicamento)
route.patch('/api/tratamientos/comida/:id', [autenticacion, verificarMedico], TratamientosController.editarComida)

export default route