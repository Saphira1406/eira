import * as PacientesServices from '../services/pacientes.service.js'

function traerTodos (req ,res) {
    PacientesServices.traerTodos()
    .then(function (pacientes) {
        pacientes ?
        res.status(200).json(pacientes) :
        res.status(404).json({mensaje: "No hay pacientes..." })
    })
}

export {
    traerTodos
}
