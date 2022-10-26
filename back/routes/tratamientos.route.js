import express from 'express'
import * as TratamientosController from '../controllers/tratamientos.controller.js'

const route = express.Router()

route.get('/api/tratamientos', TratamientosController.traerTodos)
route.get('/api/tratamientos/paciente/:id', TratamientosController.traerPorIdPaciente)
route.get('/api/tratamientos/:id', TratamientosController.traerPorId)
route.post('/api/tratamientos', TratamientosController.crear)
route.delete('/api/tratamientos/:id', TratamientosController.eliminar)
route.patch('/api/tratamientos/:id', TratamientosController.editarMedicamento)
route.patch('/api/tratamientos/comida/:id', TratamientosController.editarComida)

export default route