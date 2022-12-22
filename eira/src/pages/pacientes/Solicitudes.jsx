import { useContext, useEffect, useState } from "react"
import { UsuarioContext } from "../../context/UsuarioContext.jsx"
import * as SolicitudesService from '../../services/solicitudes.service.js'
import * as PacientesService from '../../services/pacientes.service.js'
import * as ProfesionalesService from '../../services/profesionales.service.js'

function Solicitudes() {
    const [solicitudes, setSolicitudes] = useState([])
    const [profesionales, setProfesionales] = useState([])
    const [paciente, setPaciente] = useState({})

    const {usuarioLogueado} = useContext(UsuarioContext)
    useEffect(() => {
        SolicitudesService.traerPorUsuario(usuarioLogueado._id)
        .then(resp => setSolicitudes(resp))

        PacientesService.traerPorId(usuarioLogueado._id)
        .then(resp => setPaciente(resp))

        ProfesionalesService.traer()
        .then(resp => setProfesionales(resp))

    }, [])

    console.log("Solicitudes",solicitudes)

    function aceptarSolicitud(emisor, receptor) {
        SolicitudesService.agregarUsuario(emisor, receptor)
        .then(resp => {
            SolicitudesService.traerPorUsuario(usuarioLogueado._id)
            .then(resp => setSolicitudes(resp))
        })
    }

    function buscarVinculacion(idProfesional) {
        const recibido = solicitudes.some((solicitud) => solicitud.emisor._id === idProfesional) 
        return recibido
    }
    
    function enviarSolicitud(profesional, ev) {
        console.log("agrego profesional", profesional)
        SolicitudesService.enviarSolicitud(paciente, profesional)
        .then(resp => console.log(resp))
        ev.target.innerText = 'Solicitud enviada'
        ev.target.setAttribute('disabled', '')
    }
   
    return (
        <>
            <h1>Tus solicitudes pendientes</h1>
            {solicitudes.map((solicitud, i) =>
             <div key={i}>
                { !solicitud.aceptado &&
                    <div>
                        <p>Profesional: {solicitud.emisor?.nombre} {solicitud.emisor?.apellido} | {solicitud.emisor?.email}</p>
                        <button className="btn btn-success" onClick={() => aceptarSolicitud(solicitud.emisor, solicitud.receptor)}>Aceptar</button>
                    </div>
                }
               
                </div>
            )}

            {profesionales.map((profesional, i) => 
                <div key={i}>
                    <div className="border p-2">
                        <p>{profesional.nombre} {profesional.apellido}</p>
                        <p>{profesional.especialidad}</p>
                        {  buscarVinculacion(profesional._id) ? <button className="btn btn-dark" disabled>Agregar</button> : 
                        <button className="btn btn-dark" onClick={(ev) => enviarSolicitud(profesional,ev)}>Agregar</button>}
                        
                    </div>
                </div>
            )}

            
        </>

    )
}

export default Solicitudes