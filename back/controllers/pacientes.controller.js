import * as PacientesServices from '../services/pacientes.service.js'

function traerTodos (req ,res) {
    PacientesServices.traerTodos()
    .then(function (pacientes) {
        pacientes ?
        res.status(200).json(pacientes) :
        res.status(404).json({mensaje: "No hay pacientes..." })
    })
}

function traerPorId (req ,res) {
    PacientesServices.traerPorId(req.params.id)
    .then(function (paciente) {
        paciente ?
        res.status(200).json(paciente) :
        res.status(404).json({mensaje: "No existe el paciente que busca" })
    })
}

export {
    traerTodos,
    traerPorId
}
