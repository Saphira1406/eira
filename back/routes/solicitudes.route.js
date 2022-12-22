import express from 'express'
import * as SolicitudesController from '../controllers/solicitudes.controller.js'

const route = express.Router()
route.get('/api/solicitudes/:idUsuario', SolicitudesController.traerPorUsuario)
route.post('/api/solicitudes', SolicitudesController.aceptarSolicitud)
route.post('/api/solicitud', SolicitudesController.enviarSolicitud)


export default route