import * as TratamientosService from '../services/tratamientos.service.js'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import * as PacientesService from '../services/pacientes.service.js'

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
        if(window.confirm("¿Eliminar tratamiento?")) {
            TratamientosService.eliminar(ev.target.idTratamiento.value)
            .then(() => {
            TratamientosService.traerPorIdPaciente(id)
            })
            .then(resp => {
                setTratamientos(resp)
            })
        }
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
                                <p><span className="fw-bold">N° de Documento: </span> ...</p>
                            </div>
                            {tratamientos.map((tratamiento, j) =>
                            <Card body className='shadow px-2 pt-2 my-3' key={j}>
                                <Accordion alwaysOpen className='mt-3 mb-4'>
                                    <Accordion.Item eventKey="0" className='shadow'>
                                        <Accordion.Header>Comidas restringidas</Accordion.Header>
                                            <Accordion.Body>
                                            {tratamiento.tratamiento.comidas?.map((comida, k) =>
                                                <div key={k}>
                                                    <ul className="lista-agregada d-flex justify-content-center">
                                                        <li className="shadow mx-2">{comida}</li>
                                                    </ul>
                                                    <div className='d-flex justify-content-center'>
                                                        <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{comida,idTratamiento: tratamiento._id, idPaciente: id}} className="btn btn-agregar">Editar </Link>
                                                    </div>
                                                </div>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1" className='shadow my-4'>
                                            <Accordion.Header>Medicamentos</Accordion.Header>
                                            <Accordion.Body>
                                            {tratamiento.tratamiento.medicamentos?.map((medicamento, i) =>
                                                <div key={i}>
                                                    <ul className="lista-agregada-meds">
                                                        <li className="shadow mb-3">
                                                            <span className="fw-bold">{medicamento.nombre}</span><br/>
                                                            <span className="me-5">
                                                                <span className="fw-bold">Debe tomar el medicamento cada:</span> {medicamento.horas} hs
                                                            </span>
                                                            <span>
                                                                <span className="fw-bold">Finaliza el:</span> {medicamento.fecha}
                                                            </span>
                                                            </li>
                                                    </ul>
                                                    <div className='d-flex justify-content-center'>
                                                        <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{medicamento, idTratamiento: tratamiento._id, idPaciente: id}} className="btn btn-agregar">Editar </Link>
                                                    </div>
                                                </div>
                                            )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2" className='shadow'>
                                            <Accordion.Header>Ejercicios</Accordion.Header>
                                            <Accordion.Body>
                                            {   tratamiento.tratamiento.ejercicios?.map((ejercicio, l) =>
                                            <div key={l}>
                                                <ul className="lista-agregada-meds">
                                                    <li className="shadow mb-3">
                                                        <span className="fw-bold">{ejercicio.ejercicio}</span><br/>
                                                        <span className="me-5">
                                                            <span className="fw-bold">Cantidad de repeticiones:</span> {ejercicio.repeticiones}
                                                        </span>
                                                        <span className="me-5">
                                                            <span className="fw-bold">Video:</span> {ejercicio.video}
                                                        </span>
                                                    </li>
                                                </ul>
                                                <div className='d-flex justify-content-center'>
                                                    <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{ejercicio, idTratamiento: tratamiento._id, idPaciente: id}} className="btn btn-agregar">Editar</Link>
                                                </div>
                                            </div>
                                            )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
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