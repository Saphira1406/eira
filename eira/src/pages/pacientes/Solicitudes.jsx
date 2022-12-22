import { useContext, useEffect, useState } from "react"
import { UsuarioContext } from "../../context/UsuarioContext.jsx"
import * as SolicitudesService from '../../services/solicitudes.service.js'

function Solicitudes() {
    const [solicitudes, setSolicitudes] = useState([])
    const {usuarioLogueado} = useContext(UsuarioContext)

    useEffect(() => {
        SolicitudesService.traerPorUsuario(usuarioLogueado._id)
        .then(resp => setSolicitudes(resp))
    }, [])

    function aceptarSolicitud(emisor, receptor) {
        SolicitudesService.agregarUsuario(emisor, receptor)
        .then(resp => {
            SolicitudesService.traerPorUsuario(usuarioLogueado._id)
            .then(resp => setSolicitudes(resp))
        })
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
        </>
    )
}

export default Solicitudes