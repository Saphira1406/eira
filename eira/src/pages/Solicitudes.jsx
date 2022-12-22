import { useContext, useEffect, useState } from "react"
import { UsuarioContext } from "../context/UsuarioContext.jsx"
import * as SolicitudesService from '../services/solicitudes.service.js'
import * as PacientesService from '../services/pacientes.service.js'
import * as ProfesionalesService from '../services/profesionales.service.js'
import { Alert , Container, Row, Col, Card, Button, Table} from 'react-bootstrap'
import * as ChatService from "../services/chat.service"

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

    function aceptarSolicitud(emisor, receptor) {
        //acepta la solicitud
        SolicitudesService.agregarUsuario(emisor, receptor)
        .then(resp => {
            SolicitudesService.traerPorUsuario(usuarioLogueado._id)
            .then(resp => setSolicitudes(resp))
        })

        const usuarios = {
            emisor: emisor._id,
            receptor: receptor._id
        }
        ChatService.crear(usuarios)
        .then(resp => console.log(resp))
    }

    // envia solicitud de PROFESIONAL -> PACIENTE | EMISOR -> RECEPTOR
    function enviarSolicitud(paciente, ev) {
        SolicitudesService.enviarSolicitud(profesional, paciente)
        .then(resp => console.log(resp))
        ev.target.innerText = 'Agregado'
    }

    function buscarSolicitud(idPaciente) {
        const recibido = solicitudes.some((solicitud) => solicitud.emisor._id === idPaciente)
        return recibido
    }

    return (
        <main className="fondo-generico">
            <Container>
                <Row>
                    <Col>
                        <Card className='shadow my-5'>
                            <Card.Body className='mx-3'>
                                <h1 className="titulo pt-2">Buscar profesionales</h1>
                                <Alert key="info" variant='info' className='shadow py-5 my-4'>
                                    <h2 className='fs-4 mb-3'>Solicitudes</h2>
                                    <ul className="list-unstyled">
                                    {solicitudes.map((solicitud, i) =>
                                        <li key={i} className="d-flex align-items-center justify-content-between pb-2 mb-3 border-bottom border-dark">
                                            {!solicitud.aceptado && <>
                                                <span><strong>{solicitud.emisor?.nombre} {solicitud.emisor?.apellido} - {solicitud.emisor?.email}</strong> te envió una solicitud.</span>
                                                <Button className="btn btn-verde" onClick={() => aceptarSolicitud(solicitud.emisor, solicitud.receptor)}>✓</Button>
                                            </>
                                            }
                                        </li>
                                    )}
                                    </ul>
                                </Alert>
                                <Table hover responsive className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>Profesional</th>
                                            <th>Especialidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {usuariosPacientes.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado profesionales</td></tr>}
                                    {usuariosPacientes.map((paciente, i) =>
                                        <tr key={i}>
                                            <td>{paciente.nombre} {profesional.paciente}</td>
                                            <td>{paciente.email}</td>
                                            <td>{buscarSolicitud(paciente._id) ? <Button className="btn btn-verde" disabled>Agregado</Button> : <Button className="btn btn-verde" onClick={(ev) => enviarSolicitud(paciente,ev)}>Agregar</Button>}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Solicitudes