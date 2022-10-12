import * as TratamientosServices from '../services/tratamientos.service.js'


function traerTodos(req, res) {
    TratamientosServices.traerTodos()
    .then(function (tratamientos) {
        res.status(200).json(tratamientos)
    })
}

function crear(req, res) {
    console.log(req.body)

    TratamientosServices.crear(req.body)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(201).json("creado")
        : 
        res.status(500).json("hubo un error")
    })
}

export {
    traerTodos,
    crear
}