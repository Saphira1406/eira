import express from 'express'
import * as TratamientosController from '../controllers/tratamientos.controller.js'
import { autenticacion, medicoVerificado } from '../middlewares/auth.middleware.js'

const route = express.Router()

route.get('/api/tratamientos', TratamientosController.traerTodos)
route.get('/api/tratamientos/paciente/:idPaciente', [autenticacion], TratamientosController.traerPorIdPaciente)
route.get('/api/tratamientos/profesional/:idProfesional/paciente/:idPaciente', [autenticacion], TratamientosController.traerPorIdProfesional)
route.get('/api/tratamientos/:id', [autenticacion], TratamientosController.traerPorId)
route.post('/api/tratamientos', [autenticacion], TratamientosController.crear)
route.delete('/api/tratamientos/:id', [autenticacion], TratamientosController.eliminar)
route.patch('/api/tratamientos/:id', [autenticacion], TratamientosController.editarMedicamento)
route.patch('/api/tratamientos/comida/:id', [autenticacion], TratamientosController.editarComida)

export default route