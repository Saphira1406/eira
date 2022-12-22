import { useContext, useEffect, useState } from 'react'
import * as ProfesionalesService from '../../services/profesionales.service.js'
import * as UsuarioService from '../../services/usuarios.service.js'
import * as PacientesService from '../../services/pacientes.service.js'
import * as SolicitudesService from '../../services/solicitudes.service.js'
import { UsuarioContext } from '../../context/UsuarioContext.jsx'

function ProfesionalesVinculados(){
    const [profesionales, setProfesionales] = useState([])
    const [paciente, setPaciente] = useState({})
    const [solicitudes, setSolicitudes] = useState([])
    const {usuarioLogueado} = useContext(UsuarioContext)


    useEffect(() => {
        ProfesionalesService.traer()
        .then(resp => setProfesionales(resp))

        PacientesService.traerPorId(usuarioLogueado._id)
        .then(resp => setPaciente(resp))

        SolicitudesService.traerPorUsuario(usuarioLogueado._id)
        .then( resp => setSolicitudes(resp))

    }, [])
    console.log(solicitudes)

    // envia solicitud de PACIENTE -> PROFESIONAL | EMISOR -> RECEPTOR
    function enviarSolicitud(profesional, ev) {
        console.log("agrego profesional", profesional)
        SolicitudesService.enviarSolicitud(paciente, profesional)
        .then(resp => console.log(resp))
        ev.target.innerText = 'Agregado'
    }

    function aceptarSolicitud(emisor, receptor) {
        //console.log(emisor)
        //console.log(receptor)

        //acepta la solicitud
        SolicitudesService.agregarUsuario(emisor, receptor)
        .then(resp => {
            SolicitudesService.traerPorUsuario(usuarioLogueado._id)
            .then(resp => setSolicitudes(resp))
        })      
    }

    function buscarSolicitud(idProfesional) {
        const recibido = solicitudes.some((solicitud) => solicitud.emisor._id === idProfesional) 
        return recibido
    }

    return (
        <>
            <h1>Buscar profesional</h1>
            {solicitudes.map((solicitud, i) =>
             <div key={i}>
                { !solicitud.aceptado &&
                    <div>
                        <p>Paciente: {solicitud.emisor?.nombre} {solicitud.emisor?.apellido} | {solicitud.emisor?.email}</p>
                        <button className="btn btn-success" onClick={() => aceptarSolicitud(solicitud.emisor, solicitud.receptor)}>Aceptar</button>
                    </div>
                }
               
                </div>
            )}
            ---------------------------------------
            {profesionales.map((profesional, i) => 
                <div key={i}>
                    <div className="border p-2">
                        <p>{profesional.nombre} {profesional.apellido}</p>
                        <p>{profesional.especialidad}</p>
                        {  buscarSolicitud(profesional._id) ? <button className="btn btn-dark" disabled>Agregar</button> : 
                        <button className="btn btn-dark" onClick={(ev) => enviarSolicitud(profesional,ev)}>Agregar</button>}
                        
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfesionalesVinculados