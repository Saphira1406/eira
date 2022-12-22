import * as SolicitudesService from '../services/solicitudes.service.js'
import { ObjectId } from 'mongodb'

function traerPorUsuario(req, res) {
    SolicitudesService.traerPorUsuario(req.params.idUsuario)
    .then( solicitudes =>{
        solicitudes ? res.status(200).json(solicitudes) :
        res.status(404).json({
            response: false,
            message: "No hay solicitudes pendientes"
        })
    } )
    .catch(err => {
        res.status(500).json({message: "Ocurrió un error al traer las solicitudes", err})
    })
}


function aceptarSolicitud(req, res) {
    
   SolicitudesService.aceptarSolicitud(req.body.emisor, req.body.receptor)
    .then(resp => {
        resp ? res.status(200).json(resp) :
        res.status(404).json({
            response: false,
            message: "No se pudo agregar al usuario"
        })
    })
    .catch(err => {
        res.status(500).json({message: "Ocurrió un error al aceptar la solicitud", err})
    })
}


function enviarSolicitud(req, res) {
    const emisor = {
        ...req.body.emisor,
        "_id": new ObjectId(req.body.emisor._id)
    }

    const receptor = {
        ...req.body.receptor,
        "_id": new ObjectId(req.body.receptor._id)
    }
    
    
    SolicitudesService.enviarSolicitud(emisor, receptor)
     .then(resp => {
         resp ? res.status(200).json(resp) :
         res.status(404).json({
             response: false,
             message: "No se pudo enviar la solicitud al usuario"
         })
     })
     .catch(err => {
         res.status(500).json({message: "Ocurrió un error al enviar la solicitud", err})
     })
 }

export {
    traerPorUsuario,
    aceptarSolicitud,
    enviarSolicitud
}