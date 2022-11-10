import * as ProfesionalesServices from '../services/profesionales.service.js'

function traerTodos (req ,res) {
    ProfesionalesServices.traerTodos()
    .then(function (profesionales) {
        profesionales ?
        res.status(200).json(profesionales) :
        res.status(404).json({mensaje: "No hay profesionales de la salud..." })
    })
}

function traerPacientes (req ,res) {
    ProfesionalesServices.traerPacientes(req.params.id)
    .then(function (pacientes) {
        pacientes ?
        res.status(200).json(pacientes) :
        res.status(404).json({mensaje: "No hay pacientes vinculados al profesional..." })
    })
}

function traerPorId (req ,res) {
    ProfesionalesServices.traerPorId(req.params.id)
    .then(function (profesional) {
        profesional ?
        res.status(200).json(profesional) :
        res.status(404).json({mensaje: "No existe el profesional que busca" })
    })
}


function editar (req, res) {
    const id = req.params.id
    const usuario = req.body

    console.log(req.body)
    ProfesionalesServices.editar(id, usuario)
    .then(function (usuarioEditado) {
        usuarioEditado ?
        res.status(200).json(usuarioEditado) :
        res.status(404).json({mensaje: "No existe el profesional que busca para editar" })
    })

}

function eliminar (req, res) {


    ProfesionalesServices.eliminar(req.params.id)
    .then((usuarioEliminado) => {
        usuarioEliminado ?
        res.status(200).json(usuarioEliminado) :
        res.status(404).json({mensaje: "No existe el profesional..." })
    })
}

function eliminarPaciente (req, res) {
    ProfesionalesServices.eliminarPaciente(req.params.idProfesional, req.params.idPaciente)
    .then((pacienteEliminado) => {
        pacienteEliminado ?
        res.status(200).json(pacienteEliminado) :
        res.status(404).json({mensaje: "No existe el pacientee..." })
    })
}

export {
    traerTodos,
    traerPorId,
    editar,
    eliminar,
    traerPacientes,
    eliminarPaciente
    
}
