import { useState, useEffect } from 'react'
import * as PacientesService from '../services/pacientes.service.js'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination';
import IconoCrear from '../imgs/icono-crear.png'
import IconoVer from '../imgs/icono-ver.png'
import IconoEliminar from '../imgs/icono-eliminar.png'

function ListadoPacientes() {
    const [pacientes, setPacientes] = useState([])

    useEffect(() => {
        PacientesService.traer()
        .then((pacientes) => {
            setPacientes(pacientes)
        })
    }, [])

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
                                        <Form.Control type="search" placeholder="Buscar paciente" />
                                    </Form.Group>
                                </Form>
                            </div>
                            <Table hover responsive className="mt-4">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {pacientes.map((paciente, i) =>
                                    <tr key={i}>
                                        <td>{paciente.nombre}</td>
                                        <td>{paciente.apellido}</td>
                                        <td>{paciente.email}</td>
                                        <td>
                                            <Link to={`/tratamiento/${paciente._id}`} className="btn btn-crear me-2"><img src={IconoCrear} alt="Icono crear"/></Link>
                                            <Link to={`/ver-tratamiento/${paciente._id}`} className="btn btn-ver me-2"><img src={IconoVer} alt="Icono ver"/></Link>
                                            <a className="btn btn-eliminar"><img src={IconoEliminar} alt="Icono eliminar"/></a>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                            <Pagination className='d-flex justify-content-center mt-3'>
                                <Pagination.Prev className='flechaPag'/>
                                <Pagination.Item active className='numPag'>{1}</Pagination.Item>
                                <Pagination.Item className='numPag'>{2}</Pagination.Item>
                                <Pagination.Item className='numPag'>{3}</Pagination.Item>
                                <Pagination.Next className='flechaPag'/>
                            </Pagination>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ListadoPacientes