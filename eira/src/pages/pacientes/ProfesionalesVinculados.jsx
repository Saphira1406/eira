import { useContext, useEffect, useState } from 'react'
import * as ProfesionalesService from '../../services/profesionales.service.js'
import * as UsuarioService from '../../services/usuarios.service.js'
import * as PacientesService from '../../services/pacientes.service.js'
import * as SolicitudesService from '../../services/solicitudes.service.js'
import { UsuarioContext } from '../../context/UsuarioContext.jsx'
import { Alert , Container, Row, Col, Card, Button, Table} from 'react-bootstrap'

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

    // envia solicitud de PACIENTE -> PROFESIONAL | EMISOR -> RECEPTOR
    function enviarSolicitud(profesional, ev) {
        SolicitudesService.enviarSolicitud(paciente, profesional)
        .then(resp => console.log(resp))
        ev.target.innerText = 'Agregado'
    }

    function aceptarSolicitud(emisor, receptor) {
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
                                                <span><strong>{solicitud.emisor?.nombre} {solicitud.emisor?.apellido} - {solicitud.emisor?.especialidad}</strong> te envió una solicitud.</span>
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
                                    {profesionales.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado profesionales</td></tr>}
                                    {profesionales.map((profesional, i) =>
                                        <tr key={i}>
                                            <td>{profesional.nombre} {profesional.apellido}</td>
                                            <td>{profesional.especialidad}</td>
                                            <td>{buscarSolicitud(profesional._id) ? <Button className="btn btn-verde" disabled>Agregado</Button> : <Button className="btn btn-verde" onClick={(ev) => enviarSolicitud(profesional,ev)}>Agregar</Button>}</td>
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

export default ProfesionalesVinculados