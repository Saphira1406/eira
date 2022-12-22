import * as TratamientosServices from '../services/tratamientos.service.js'
import { ObjectId } from 'mongodb'

function traerTodos(req, res) {
    TratamientosServices.traerTodos()
    .then(function (tratamientos) {
        res.status(200).json(tratamientos)
    })
}

function crear(req, res) {
    console.log(req.body)
    const tratamiento = {
        ...req.body,
        profesional: {
            id_medico: new ObjectId(req.body.id_medico),
            nombre: req.body.profesional_nombre,
            apellido: req.body.profesional_apellido,
        },
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

function traerPorIdPaciente (req, res) {
   
    
    TratamientosServices.traerPorIdPaciente(req.params.idPaciente, req.params.idProfesional)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(200).json(tratamiento) :
        res.status(404).json({mensaje: "No hay tratamiento.." })
    })
}

function traerPorIdProfesional (req, res) {
    console.log(req.params)
    TratamientosServices.traerPorIdProfesional(req.params.idPaciente,req.params.idProfesional)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(200).json(tratamiento) :
        res.status(404).json({mensaje: "No hay tratamiento.." })
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

function editarMedicamento (req, res) {
    const id = req.params.id
    const tratamiento = {
        ...req.body
    }
    TratamientosServices.editarMedicamento(id, req.body.tratamiento.id, req.body.tratamiento, req.body.tipo)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(200).json(tratamiento) :
        res.status(404).json({mensaje: "No hay tratamiento para editar.." })
    })
}

function editarComida (req, res) {
    const id = req.params.id
    const comidaAntigua = req.body.comidaAntigua
    const comidaNueva = req.body.comidaNueva

    TratamientosServices.editarComida(id, comidaAntigua, comidaNueva)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(200).json(tratamiento) :
        res.status(404).json({mensaje: "No hay tratamiento para editar.." })
    })
}

export {
    traerTodos,
    crear,
    traerPorIdPaciente,
    traerPorId,
    eliminar,
    editarMedicamento,
    editarComida,
    traerPorIdProfesional
}