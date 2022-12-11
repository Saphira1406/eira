import * as TratamientosService from '../services/tratamientos.service.js'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Card, Container, Row, Col, Accordion } from 'react-bootstrap'
import * as PacientesService from '../services/pacientes.service.js'
import * as ProfesionalesService from '../services/profesionales.service.js'
import IconoEliminar from '../imgs/icono-cruz-eliminar.png'
import { UsuarioContext } from '../context/UsuarioContext.jsx'
import Swal from 'sweetalert2'
import * as Notificaciones from '../services/notificacion.service.js'

function VerTratamiento() {
    const { id } = useParams()
    const [tratamientos, setTratamientos] = useState([])
    const [tratamientosDelProfesional, setTratamientosDelProfesional] = useState([])
    const [paciente, setPaciente] = useState({})
    const {usuarioLogueado} = useContext(UsuarioContext)

    const tokenFB = localStorage.getItem('tokenFB')

    useEffect(() => {
        TratamientosService.traerPorIdPaciente(id)
        .then(resp => {
            setTratamientos(resp)
        })
        PacientesService.traerPorId(id)
        .then(resp => setPaciente(resp))

        TratamientosService.traerPorIdProfesional(id, usuarioLogueado._id)
        .then( resp => setTratamientosDelProfesional(resp) )
    }, [])

    console.log("###",tratamientosDelProfesional)
    console.log(tratamientos)
    function handleSubmitBorrarTratamiento(ev) {
        ev.preventDefault()

        Swal.fire({
            title: '¿Seguro que quiere eliminar el tratamiento?',
            text: "No podrás volver atrás",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        })
        .then((result) => {
            if (result.isConfirmed) {
                TratamientosService.eliminar(ev.target.idTratamiento.value)
                .then(() => {
                    TratamientosService.traerPorIdPaciente(id)
                    .then(resp => { setTratamientos(resp) })

                    TratamientosService.traerPorIdProfesional(id, usuarioLogueado._id)
                    .then( resp => setTratamientosDelProfesional(resp) )
                })
                Swal.fire(
                    'Se borró correctamente',
                    '',
                    'success'
                )
            }
        })
    }

    function guardarNotificacion() {
        console.log("TOKENFB",tokenFB)
        console.log("FECHA QUE FINALIZA",tokenFB)
        const finalizacion = Date.now()
        Notificaciones.guardarNotificacion({tokenFB, finalizacion})
        .then( resp => console.log(resp))
    }

    return (
        <main id="ver-tratamiendo">
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                                <h1 className="titulo">Ver tratamiento</h1>
                                <Row>
                                    <Col lg={6} className="">
                                        <p><span className="fw-bold">Paciente:</span> {paciente.nombre} {paciente.apellido}</p>
                                    </Col>
                                    <Col lg={6}>
                                        <p className='text-lg-end'><span className="fw-bold">N° de Documento: </span> {paciente.dni}</p>
                                    </Col>
                                    <Col lg={12} >
                                        {!tratamientos.length && usuarioLogueado.matricula && <p className="h4 my-3"><span className="fw-bold">{paciente.nombre} {paciente.apellido}</span> no tiene un tratamiento asignado, si desea crear uno, <Link to={`/tratamiento/${id}`}>entrá acá</Link></p>}
                                        {!tratamientos.length && !usuarioLogueado.matricula && <p className="h4 my-3"><span className="fw-bold">{paciente.nombre} {paciente.apellido}</span> todavía no le asignaron tratamientos...</p>}
                                        <button onClick={() => guardarNotificacion()}>guardar hora tomada</button>
                                    </Col>
                                </Row>

                                {usuarioLogueado.matricula && tratamientosDelProfesional.map((tratamiento, j) =>

                                <Accordion defaultActiveKey={tratamiento._id} className='shadow my-3' key={j}>
                                    <Accordion.Item eventKey={tratamiento._id}>
                                        <Accordion.Header>Diagnóstico:&nbsp;<b>{tratamiento.diagnostico}</b></Accordion.Header>
                                        <Accordion.Body>
                                            {tratamiento.tratamiento.comidas?.length > 0 &&
                                                <Card className="border-0 shadow my-4">
                                                    <Card.Header className="tratamiento-header-paciente">Comidas Restringidas</Card.Header>
                                                    <Card.Body className="px-4">
                                                        <ul className="lista-agregada d-md-flex justify-content-center">
                                                            {tratamiento.tratamiento.comidas?.map((comida, k) =>
                                                                <li className="shadow mx-2 mb-3 mb-md-0" key={k}>
                                                                <span>{comida}</span><br/>
                                                                    {usuarioLogueado.matricula && <> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{comida,idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                                    <Link className="btn-eliminar-trat mt-2">Eliminar</Link></> }
                                                                </li>
                                                                )}
                                                            </ul>
                                                    </Card.Body>
                                                </Card>
                                            }

                                            {tratamiento.tratamiento.medicamentos?.length > 0 &&
                                                <Card className="border-0 shadow my-4">
                                                    <Card.Header className="tratamiento-header-paciente">Medicamentos</Card.Header>
                                                    <Card.Body className="px-4">
                                                        <ul className="lista-agregada-meds">
                                                            {tratamiento.tratamiento.medicamentos?.map((medicamento, i) =>
                                                                <li className="shadow mb-3" key={i}>
                                                                    <span className="fw-bold">{medicamento.nombre}</span><br/>
                                                                    <span className="me-5">
                                                                        <span className="fw-bold">Frecuencia:</span>  <br className="d-block d-sm-none"/>{medicamento.horas} hs
                                                                    </span><br/>
                                                                    <span>
                                                                        <span className="fw-bold">Finaliza el:</span>  <br className="d-block d-sm-none"/>{medicamento.fecha}
                                                                    </span>

                                                                    {usuarioLogueado.matricula && <span className='d-flex justify-content-center mt-3'>
                                                                        <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{medicamento, idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                                        <Link className="btn-eliminar-trat mt-2">Eliminar</Link>
                                                                    </span>}
                                                                </li>
                                                            )}
                                                            </ul>
                                                    </Card.Body>
                                                </Card>
                                            }

                                            {tratamiento.tratamiento.ejercicios?.length > 0 &&
                                                <Card className="border-0 shadow my-4">
                                                    <Card.Header className="tratamiento-header-paciente">Ejercicios</Card.Header>
                                                    <Card.Body className="px-4">
                                                        <ul className="lista-agregada-meds">
                                                            {tratamiento.tratamiento.ejercicios?.map((ejercicio, l) =>
                                                            <li className="shadow mb-3" key={l}>
                                                                <span className="fw-bold">{ejercicio.ejercicio}</span><br/>
                                                                <span className="me-5">
                                                                    <span className="fw-bold">Cantidad de repeticiones:</span>  <br className="d-block d-sm-none"/>{ejercicio.repeticiones}
                                                                </span><br/>
                                                                <span className="me-5">
                                                                    <span className="fw-bold">Video:</span>  <br className="d-block d-sm-none"/>{ejercicio.video}
                                                                </span>

                                                                {usuarioLogueado.matricula && <span className='d-flex justify-content-center mt-4'>
                                                                    <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{ejercicio, idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                                    <Link className="btn-eliminar-trat mt-2">Eliminar</Link>
                                                                </span>}
                                                            </li>
                                                            )}
                                                            </ul>
                                                    </Card.Body>
                                                </Card>
                                            }

                                            <Card.Footer className="bg-transparent border-0">
                                                {usuarioLogueado.matricula && <form onSubmit={handleSubmitBorrarTratamiento}>
                                                    <div className='d-flex justify-content-center'>
                                                        <button type="submit" className="border-0 link-eliminar">Eliminar tratamiento</button>
                                                        <input type="hidden" name="idTratamiento" value={tratamiento._id}/>
                                                    </div>
                                                </form>}
                                            </Card.Footer>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                )}

                                {!usuarioLogueado.matricula && tratamientos.map((tratamiento, j) =>

                                <Accordion defaultActiveKey={tratamiento._id} className='shadow my-3' key={j}>
                                    <Accordion.Item eventKey={tratamiento._id}>
                                        <Accordion.Header><p>Diagnóstico:&nbsp;<b>{tratamiento.diagnostico}</b></p></Accordion.Header>
                                        <Accordion.Body>
                                            <p><b>Profesional:</b> {tratamiento.profesional.nombre} {tratamiento.profesional.apellido}</p>
                                            {tratamiento.tratamiento.comidas?.length > 0 &&
                                                <Card className="border-0 shadow my-4">
                                                    <Card.Header className="tratamiento-header-paciente">Comidas Restringidas</Card.Header>
                                                    <Card.Body className="px-4">
                                                        <ul className="lista-agregada d-lg-flex justify-content-center">
                                                            {tratamiento.tratamiento.comidas?.map((comida, k) =>
                                                                <li className="shadow mx-2 mb-3 mb-lg-0" key={k}>
                                                                    <span>{comida}</span><br/>
                                                                </li>
                                                                )}
                                                            </ul>
                                                    </Card.Body>
                                                </Card>
                                            }

                                            {tratamiento.tratamiento.medicamentos?.length > 0 &&
                                                <Card className="border-0 shadow my-4">
                                                    <Card.Header className="tratamiento-header-paciente">Medicamentos</Card.Header>
                                                    <Card.Body className="px-4">
                                                        <ul className="lista-agregada-meds">
                                                            {tratamiento.tratamiento.medicamentos?.map((medicamento, i) =>
                                                                <li className="shadow mb-3" key={i}>
                                                                    <span className="fw-bold">{medicamento.nombre}</span><br/>
                                                                    <span>
                                                                        <span className="fw-bold">Frecuencia:</span> <br className="d-block d-sm-none"/>{medicamento.horas} hs
                                                                    </span><br/>
                                                                    <span>
                                                                        <span className="fw-bold">Finaliza el:</span> <br className="d-block d-sm-none"/>{medicamento.fecha}
                                                                    </span>
                                                                </li>
                                                            )}
                                                            </ul>
                                                    </Card.Body>
                                                </Card>
                                            }

                                            {tratamiento.tratamiento.ejercicios?.length > 0 &&
                                                <Card className="border-0 shadow my-4">
                                                    <Card.Header className="tratamiento-header-paciente">Ejercicios</Card.Header>
                                                    <Card.Body className="px-4">
                                                        <ul className="lista-agregada-meds">
                                                            {tratamiento.tratamiento.ejercicios?.map((ejercicio, l) =>
                                                            <li className="shadow mb-3" key={l}>
                                                                <span className="fw-bold">{ejercicio.ejercicio}</span><br/>
                                                                <span>
                                                                    <span className="fw-bold">Repeticiones:</span> <br className="d-block d-sm-none"/>{ejercicio.repeticiones}
                                                                </span><br/>
                                                                <span>
                                                                    <span className="fw-bold">Video:</span><br className="d-block d-sm-none"/> {ejercicio.video}
                                                                </span>
                                                            </li>
                                                            )}
                                                            </ul>
                                                    </Card.Body>
                                                </Card>
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )

}

export default VerTratamiento