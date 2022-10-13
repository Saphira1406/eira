import * as TratamientosServices from '../services/tratamientos.service.js'
import { ObjectId } from 'mongodb'

function traerTodos(req, res) {
    TratamientosServices.traerTodos()
    .then(function (tratamientos) {
        res.status(200).json(tratamientos)
    })
}

function crear(req, res) {
    const tratamiento = {
        ...req.body,
        id_medico: new ObjectId(req.body.id_medico),
        id_paciente: new ObjectId(req.body.id_paciente),
    }

    TratamientosServices.crear(tratamiento)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(201).json("creado")
        : 
        res.status(500).json("hubo un error")
    })
}

function traerPorId (req, res) {
 
    TratamientosServices.traerPorId(req.params.id)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(200).json(tratamiento) :
        res.status(404).json({mensaje: "No hay tratamiento.." })
    })
}

function eliminar (req, res) {
 
    TratamientosServices.eliminar(req.params.id)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(200).json(tratamiento) :
        res.status(404).json({mensaje: "No hay tratamiento para eliminar.." })
    })
}

function editar (req, res) {
 const id = req.params.id
 const tratamiento = {
    ...req.body
 }
    TratamientosServices.editar(id, tratamiento)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(200).json(tratamiento) :
        res.status(404).json({mensaje: "No hay tratamiento para eliminar.." })
    })
}


export {
    traerTodos,
    crear,
    traerPorId,
    eliminar,
    editar
}