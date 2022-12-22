import { useContext, useEffect, useState } from "react"
import { UsuarioContext } from "../context/UsuarioContext.jsx"
import * as SolicitudesService from '../services/solicitudes.service.js'
import * as PacientesService from '../services/pacientes.service.js'
import * as ProfesionalesService from '../services/profesionales.service.js'

function Solicitudes() {
    const [solicitudes, setSolicitudes] = useState([])
    const [usuariosPacientes, setUsuariosPacientes] = useState([])
    const [profesional, setProfesional] = useState({})

    const {usuarioLogueado} = useContext(UsuarioContext)

    useEffect(() => {
        SolicitudesService.traerPorUsuario(usuarioLogueado._id)
        .then(resp => setSolicitudes(resp))
        
        PacientesService.traer()
        .then(resp => setUsuariosPacientes(resp))

        ProfesionalesService.traerPorId(usuarioLogueado._id)
        .then(resp => setProfesional(resp))
    }, [])

    console.log("Solicitudes",solicitudes)

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

    // envia solicitud de PROFESIONAL -> PACIENTE | EMISOR -> RECEPTOR
    function enviarSolicitud(paciente, ev) {
      //  console.log("envio solicitud a:", paciente)
        SolicitudesService.enviarSolicitud(profesional, paciente)
        .then(resp => console.log(resp))
        ev.target.innerText = 'Agregado'
    }

    function buscarSolicitud(idPaciente) {
        const recibido = solicitudes.some((solicitud) => solicitud.emisor._id === idPaciente) 
        return recibido
    }


    return (
        <>
            <h1>Tus solicitudes pendientes</h1>
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
--------------------------------------
<p>Lista usuarios pacientes</p>
            {usuariosPacientes.map((paciente, i) => 
                <div key={i}>
                     <p>Paciente: {paciente.nombre} {paciente.apellido} | {paciente.email}</p>
                    
                     {  buscarSolicitud(paciente._id) ? <button className="btn btn-dark" disabled>Agregar</button> : 
                        <button className="btn btn-dark" onClick={(ev) => enviarSolicitud(paciente,ev)}>Agregar</button>}
                </div>
            )}
        </>

    )
}

export default Solicitudes