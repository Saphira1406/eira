import * as TratamientosService from '../services/tratamientos.service.js'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import * as PacientesService from '../services/pacientes.service.js'
import IconoEliminar from '../imgs/icono-cruz-eliminar.png'

function VerTratamiento() {
    const { id } = useParams()
    const [tratamientos, setTratamientos] = useState([])
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        TratamientosService.traerPorIdPaciente(id)
        .then(resp => {
            setTratamientos(resp)
        })
        PacientesService.traerPorId(id)
        .then(resp => setPaciente(resp))
    }, [])
    console.log("-->",tratamientos)

    function test(tests) {
        console.log("click", tests)
    }

    function handleSubmitBorrarTratamiento(ev) {
        ev.preventDefault()
        /*if(window.confirm("¿Eliminar tratamiento?")) {
            TratamientosService.eliminar(ev.target.idTratamiento.value)
            .then(() => {
            TratamientosService.traerPorIdPaciente(id)
            })
            .then(resp => {
                setTratamientos(resp)
            })
        }*/
        TratamientosService.eliminar(ev.target.idTratamiento.value)
        .then(() => {
        TratamientosService.traerPorIdPaciente(id)
        .then(resp => {
            setTratamientos(resp)
        })
        })
    }

    return (
        <main>
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo">Ver tratamiento</h1>
                            <div className='d-flex justify-content-between mt-4'>
                                <p><span className="fw-bold">Paciente:</span> {paciente.nombre} {paciente.apellido}</p>
                                <p><span className="fw-bold">N° de Documento: </span> {paciente.dni}</p>
                            </div>
                            {tratamientos.map((tratamiento, j) =>
                            <Card body className='shadow px-2 pt-2 my-3' key={j}>
                                <Accordion alwaysOpen className='mt-3 mb-4'>
                                    <Accordion.Item eventKey="0" className='shadow'>
                                        <Accordion.Header>Comidas restringidas</Accordion.Header>
                                            <Accordion.Body>
                                            <ul className="lista-agregada d-flex justify-content-center">
                                            {tratamiento.tratamiento.comidas?.map((comida, k) =>
                                                <li className="shadow mx-2" key={k}>
                                                <span>{comida}</span><br/>
                                                <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{comida,idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                <Link className="btn-eliminar-trat mt-2">Eliminar</Link>
                                                </li>
                                                )}
                                            </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1" className='shadow my-4'>
                                            <Accordion.Header>Medicamentos</Accordion.Header>
                                            <Accordion.Body>
                                            <ul className="lista-agregada-meds">
                                            {tratamiento.tratamiento.medicamentos?.map((medicamento, i) =>
                                                <li className="shadow mb-3" key={i}>
                                                    <span className="fw-bold">{medicamento.nombre}</span><br/>
                                                    <span className="me-5">
                                                        <span className="fw-bold">Debe tomar el medicamento cada:</span> {medicamento.horas} hs
                                                    </span>
                                                    <span>
                                                        <span className="fw-bold">Finaliza el:</span> {medicamento.fecha}
                                                    </span>
                                                    <span className='d-flex justify-content-center mt-3'>
                                                        <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{medicamento, idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                        <Link className="btn-eliminar-trat mt-2">Eliminar</Link>
                                                    </span>
                                                </li>
                                            )}
                                            </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2" className='shadow'>
                                            <Accordion.Header>Ejercicios</Accordion.Header>
                                            <Accordion.Body>
                                            <ul className="lista-agregada-meds">
                                            {   tratamiento.tratamiento.ejercicios?.map((ejercicio, l) =>
                                            <li className="shadow mb-3" key={l}>
                                                <span className="fw-bold">{ejercicio.ejercicio}</span><br/>
                                                <span className="me-5">
                                                    <span className="fw-bold">Cantidad de repeticiones:</span> {ejercicio.repeticiones}
                                                </span>
                                                <span className="me-5">
                                                    <span className="fw-bold">Video:</span> {ejercicio.video}
                                                </span>
                                                <span className='d-flex justify-content-center mt-4'>
                                                    <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{ejercicio, idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                    <Link className="btn-eliminar-trat mt-2">Eliminar</Link>
                                                </span>
                                            </li>
                                            )}
                                            </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>

                                    <Card.Footer className="bg-transparent border-0">
                                    <form onSubmit={handleSubmitBorrarTratamiento}>
                                        <div className='d-flex justify-content-center'>
                                            <button type="submit" className="border-0 link-eliminar">Eliminar tratamiento</button>
                                            <input type="hidden" name="idTratamiento" value={tratamiento._id}/>
                                        </div>
                                    </form>
                                    </Card.Footer>
                                </Card>
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