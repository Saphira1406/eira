import { useState, useEffect, useContext } from 'react'
import * as ProfesionalesService from '../services/profesionales.service.js'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Container, Row, Col, Form, Table, Tooltip, Dropdown } from 'react-bootstrap'
import IconoCrear from '../imgs/icono-crear.png'
import IconoVer from '../imgs/icono-ver.png'
import IconoEliminar from '../imgs/icono-eliminar.png'
import IconoHistoriaClinica from '../imgs/icono-historia-clinica.png'
import Paginador from './Paginador.jsx'
import { UsuarioContext } from '../context/UsuarioContext'
import Swal from 'sweetalert2'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function ListadoPacientes() {
    const [pacientes, setPacientes] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [pacientesPorPagina, setPacientesPorPagina] = useState(5)

    //const usuarioLogueado = useContext(UsuarioContext)
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    //const idProfesional = "63239b30953ee51e9b52f154"
    let navigate = useNavigate();

    useEffect(
        () => {
            if(!usuarioLogueado.matricula) {
                navigate('/', { replace: true })
            }
            if(!usuarioLogueado.verificado) {
                navigate('/falta-verificacion', {replace: true})
            }
          // eslint-disable-next-line
        }, [])

    useEffect(() => {
            ProfesionalesService.traerPacientes(usuarioLogueado?._id)
            .then( (resp) => setPacientes(resp))
            console.log("vvvv", pacientes)
        // eslint-disable-next-line
    }, [])

    const indexUltimoPaciente = paginaActual * pacientesPorPagina
    const indexPrimerPaciente = indexUltimoPaciente - pacientesPorPagina
    let pacientesActuales = []
    if(pacientes.length > 0) {

        pacientesActuales = pacientes.slice(indexPrimerPaciente, indexUltimoPaciente)
    }

    // busqueda
    //const resultados = !busqueda ? pacientes : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.dni.includes(busqueda))
    const resultados = !busqueda ? pacientesActuales : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.dni.includes(busqueda))

    console.log("ggg",resultados)

    function handleSubmitEliminarPaciente(ev) {
        ev.preventDefault()
        console.log(ev.target.idPaciente.value)

        Swal.fire({
            title: '¿Seguro que quiere eliminar el paciente de su lista?',
            text: "No podrás volver atrás",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4971B7',
            cancelButtonColor: '#F3944D',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
            grow: 'row'
        })
        .then((result) => {
            if (result.isConfirmed) {
                ProfesionalesService.eliminarPaciente(usuarioLogueado._id,ev.target.idPaciente.value)
                .then( (resp) => {
                    ProfesionalesService.traerPacientes(usuarioLogueado._id)
                    .then( (resp) => setPacientes(resp))
                })
            Swal.fire(
                'Se borró correctamente',
                '',
                'success'
            )}
        })
    }

    return (
        <section id="listadoPacientes">
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
                                        <th className='d-none d-md-table-cell'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {resultados.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado pacientes</td></tr>}
                                {resultados.map((paciente, i) =>
                                    <tr key={i}>
                                        <td>{paciente.dni}</td>
                                        <td>{paciente.nombre}</td>
                                        <td>{paciente.apellido}</td>
                                        <td className='d-none d-lg-table-cell'>{paciente.email}</td>
                                        <td className='d-none d-md-flex'>
                                            <OverlayTrigger placement="top" overlay={
                                                <Tooltip id="tooltip-top1">
                                                    Crear tratamiento
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
                                        </td>
                                        <td className='d-md-none'>
                                            <Dropdown className="acciones">
                                                <Dropdown.Toggle id="dropdown-basic">
                                                    Acciones
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        <Link to={`/tratamiento/${paciente._id}`} className="link-crear">Crear tratamiento</Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item>
                                                        <Link to={`/ver-tratamiento/${paciente._id}`} className="link-ver">Ver tratamiento</Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item>
                                                        <Link to={`/historia-clinica/${paciente._id}`} className="link-historia">Ver historia clínica</Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <form onSubmit={handleSubmitEliminarPaciente} >
                                                        <button type="submit" className="link-eliminar">Eliminar paciente</button>
                                                        <input type="hidden" name="idPaciente" value={paciente._id}/>
                                                    </form>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
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
    )
}

export default ListadoPacientes