import * as ConexionesServices from '../services/conexiones.services.js'
import { ObjectId } from 'mongodb'

function traerPorUsuario (req, res) {
    const id = req.params.idUsuario
    ConexionesServices.traerPorUsuario(id)
    .then(function (pacientes) {
        pacientes ?
        res.status(200).json(pacientes) :
        res.status(404).json({mensaje: "No hay pacientes vinculados..." })
    })
}
/*
function seguir(req, res) {
    const {idFrom, idTo, nameTo} = req.body
    console.log(req.body)
    const seguido = {
        _id: ObjectId(idTo),
        nombre: nameTo
    }
    SeguidoresServices.seguir(idFrom, seguido)
    .then(function (seguir) {
        seguir ?
        res.status(201).json(seguir) :
        res.status(404).json({mensaje: "hubo un error...." })
    })
}

function traerTodos(req, res) {
    SeguidoresServices.traerTodos()
    .then( function (seguidores) {
        seguidores ?
        res.status(200).json(seguidores) :
        res.status(404).json({mensaje: "hubo un error...." })
    })
}
*/
export {
    traerPorUsuario
}