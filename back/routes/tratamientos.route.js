import express from 'express'
import * as TratamientosController from '../controllers/tratamientos.controller.js'

const route = express.Router()

route.get('/api/tratamientos', TratamientosController.traerTodos)
route.post('/api/tratamientos', TratamientosController.crear)

export default route