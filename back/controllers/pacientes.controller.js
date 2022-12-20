import * as PacientesServices from '../services/pacientes.service.js'
import * as ProfesionalesService from '../services/profesionales.service.js'

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


function traerHistoriaClinica (req ,res) {
    PacientesServices.traerHistoriaClinica(req.params.id)
    .then(function (historiaClinica) {
        historiaClinica ?
        res.status(200).json(historiaClinica) :
        res.status(404).json(historiaClinica)
    })
}

function eliminar (req, res) {
    PacientesServices.eliminar(req.params.id)
    .then((usuarioEliminado) => {
        usuarioEliminado ?
        res.status(200).json(usuarioEliminado) :
        res.status(404).json({mensaje: "No existe el paciente..." })
    })
}

function crearHistoriaClinica(req, res) {
    console.log(req.body)
    PacientesServices.crearHistoriaClinica(req.body)
    .then(function (tratamiento) {
        tratamiento ?
        res.status(201).json({
            success: true,
            mensaje: "Se guardó tu historia clinica con éxito"
        }) :
        res.status(500).json({
            success: false,
            mensaje: "Hubo un error al guardar, intente de nuevo"
        })
    })
}

function editar (req, res) {
    const id = req.params.id
    const usuario = req.body

    console.log(id, usuario)
    PacientesServices.editar(id, usuario)
    .then(function (usuarioEditado) {
        res.status(200).json(usuarioEditado)
    })
}

function traerMisMedicos(req, res) {
    PacientesServices.traerMisMedicos(req.params.id)
    .then(async function(medicos) {
        if(medicos) {
            let infoMedicos = []
            for(let medico of medicos) {
                await ProfesionalesService.traerPorId(medico.medico)
                .then(function(info) {
                    infoMedicos.push(info)
                })
            }
            res.status(200).json(infoMedicos)
        } else {
            res.status(404).json(medicos)
        }
    })
}

export {
    traerTodos,
    traerPorId,
    traerHistoriaClinica,
    editar,
    crearHistoriaClinica,
    eliminar,
    traerMisMedicos
}
