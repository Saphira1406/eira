import { useState, useEffect, useContext } from 'react'
import { Card, Container, Row, Col, Form, Table, Tooltip, OverlayTrigger, Badge } from 'react-bootstrap'
import Paginador from '../../components/Paginador.jsx'
import { Link, useNavigate } from 'react-router-dom'
import * as PacientesService from '../../services/pacientes.service.js'

function ListadoPacientes() {
    const [pacientes, setPacientes] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [pacientesPorPagina, setPacientesPorPagina] = useState(5)

    let navigate = useNavigate();

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))

    useEffect(
        () => {
            if(!usuarioLogueado.admin) {
                navigate('/', { replace: true })
            }
          // eslint-disable-next-line
        }, [])

    useEffect(() => {
        PacientesService.traer()
        .then( (resp) => setPacientes(resp))
            // eslint-disable-next-line no-unused-vars
    }, [])

    const indexUltimoPaciente = paginaActual * pacientesPorPagina
    const indexPrimerPaciente = indexUltimoPaciente - pacientesPorPagina
    let pacientesActuales = []
    if(pacientes.length > 0) {
        pacientesActuales = pacientes.slice(indexPrimerPaciente, indexUltimoPaciente)
    }

    const resultados = !busqueda ? pacientesActuales : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.matricula.includes(busqueda) || paciente.dni.includes(busqueda))


    return (
        <main id="listadoPacientes">
            <section>
                <Container>
                    <Row>
                        <Col>
                            <Card body className='shadow'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1 className="titulo">Pacientes</h1>
                                    <Form>
                                        <Form.Group controlId="buscador">
                                            <Form.Control type="search" placeholder="Buscar paciente" value={busqueda} onChange={(ev) => setBusqueda(ev.target.value)}/>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <Table hover responsive className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>DNI</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th className='d-none d-lg-table-cell'>Email</th>
                                            {/* <th>Acciones</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {resultados.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado pacientes</td></tr>}
                                    {resultados.map((paciente, i) =>
                                        <tr key={i}>
                                            {!paciente.admin &&
                                            <>
                                                <td>{paciente.dni}</td>
                                                <td>{paciente.nombre}</td>
                                                <td>{paciente.apellido}</td>
                                                <td className='d-none d-lg-table-cell'>{paciente.email}</td>
                                            </>
                                            }
                                            {/* <td className='d-flex'>
                                                <OverlayTrigger placement="top" overlay={
                                                    <Tooltip id="tooltip-top1">
                                                        Crear historia cl??nica
                                                    </Tooltip>
                                                }>
                                                <Link to={`/tratamiento/${paciente._id}`} className="btn btn-crear me-2"><img src={IconoCrear} alt="Icono crear"/></Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={
                                                    <Tooltip id="tooltip-top2">
                                                        Ver tratamiento
                                                    </Tooltip>
                                                }>
                                                <Link to={`/ver-tratamiento/${paciente._id}`} className="btn btn-ver me-2"><img src={IconoVer} alt="Icono ver"/></Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={
                                                    <Tooltip id="tooltip-top3">
                                                        Ver historia cl??nica
                                                    </Tooltip>
                                                }>
                                                <Link to={`/historia-clinica/${paciente._id}`} className="btn btn-ver-historia me-2"><img src={IconoHistoriaClinica} alt="Icono crear"/></Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={
                                                    <Tooltip id="tooltip-top4">
                                                        Eliminar paciente
                                                    </Tooltip>
                                                }>
                                                <form onSubmit={handleSubmitEliminarPaciente} >
                                                    <button type="submit" className="btn btn-eliminar"><img src={IconoEliminar} alt="Icono eliminar"/></button>
                                                    <input type="hidden" name="idPaciente" value={paciente._id}/>
                                                </form>
                                                </OverlayTrigger>
                                            </td> */}
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>

                                {resultados.length !== 0 &&
                                    <Paginador
                                    elementosPorPagina={pacientesPorPagina}
                                    totalElementos={pacientes.length}
                                    setPaginaActual={setPaginaActual}
                                    paginaActual={paginaActual} />
                                }
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default ListadoPacientes