import { useState, useEffect, useContext } from 'react'
import { Card, Container, Row, Col, Form, Table, Tooltip, OverlayTrigger, Badge } from 'react-bootstrap'
import Paginador from '../../components/Paginador.jsx'
import { Link, useNavigate } from 'react-router-dom'
import * as ProfesionalesService from '../../services/profesionales.service.js'

function ListadoMedicos() {
    const [medicos, setMedicos] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [medicosPorPagina, setMedicosPorPagina] = useState(5)

    let navigate = useNavigate();

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))

    // useEffect(
    //     () => {
    //         if(!usuarioLogueado.matricula) {
    //             navigate('/', { replace: true })
    //         }
    //       // eslint-disable-next-line
    //     }, [])

    useEffect(() => {
        ProfesionalesService.traer()
        .then( (resp) => setMedicos(resp))
            // eslint-disable-next-line no-unused-vars
    }, [])

    const indexUltimoPaciente = paginaActual * medicosPorPagina
    const indexPrimerPaciente = indexUltimoPaciente - medicosPorPagina
    let medicosActuales = []
    if(medicos.length > 0) {
        medicosActuales = medicos.slice(indexPrimerPaciente, indexUltimoPaciente)
    }

    const resultados = !busqueda ? medicosActuales : medicos.filter( (medico) => medico.nombre.toLowerCase().includes(busqueda.toLowerCase()) || medico.matricula.includes(busqueda) || medico.dni.includes(busqueda))


    return (
        <section id="listadoPacientes">
            <Container>
                <Row>
                    <Col>
                        <Card body className='shadow'>
                            <div className="d-flex justify-content-between align-items-center">
                                <h1 className="titulo">Médicos</h1>
                                <Form>
                                    <Form.Group controlId="buscador">
                                        <Form.Control type="search" placeholder="Buscar médico" value={busqueda} onChange={(ev) => setBusqueda(ev.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </div>
                            <Table hover responsive className="mt-4">
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Verificado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {resultados.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado médicos</td></tr>}
                                {resultados.map((medico, i) =>
                                    <tr key={i}>
                                        <td>{medico.dni}</td>
                                        <td>{medico.nombre}</td>
                                        <td>{medico.apellido}</td>
                                        <td>{medico.email}</td>
                                        <td>{medico.verificado ? `SI` : `NO`}</td>
                                        {/* <td className='d-flex'>
                                            <OverlayTrigger placement="top" overlay={
                                                <Tooltip id="tooltip-top1">
                                                    Crear historia clínica
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
                                                    Ver historia clínica
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
                                elementosPorPagina={medicosPorPagina}
                                totalElementos={medicos.length}
                                setPaginaActual={setPaginaActual}
                                paginaActual={paginaActual} />
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ListadoMedicos