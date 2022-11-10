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
import { Button } from 'react-bootstrap'
import Paginador from './Paginador.jsx'

function ListadoPacientes() {
    const [pacientes, setPacientes] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    const [pacientesPorPagina, setPacientesPorPagina] = useState(2)

    useEffect(() => {
        PacientesService.traer()
        .then((pacientes) => {
            setPacientes(pacientes)
        })
       
    }, [])

   

    const indexUltimoPaciente = paginaActual * pacientesPorPagina
    const indexPrimerPaciente = indexUltimoPaciente - pacientesPorPagina
    const pacientesActuales = pacientes.slice(indexPrimerPaciente, indexUltimoPaciente)
   
    // busqueda
    //const resultados = !busqueda ? pacientes : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.dni.includes(busqueda))
    const resultados = !busqueda ? pacientesActuales : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.dni.includes(busqueda))

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
                            {resultados.length === 0 && <p>No existe paciente...</p>}
                            <Table hover responsive className="mt-4">
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                               
                                {resultados.map((paciente, i) =>
                                    <tr key={i}>
                                        <td>{paciente.dni}</td>
                                        <td>{paciente.nombre}</td>
                                        <td>{paciente.apellido}</td>
                                        <td>{paciente.email}</td>
                                        <td>
                                            <Link to={`/tratamiento/${paciente._id}`} className="btn btn-crear me-2"><img src={IconoCrear} alt="Icono crear"/></Link>
                                            <Link to={`/ver-tratamiento/${paciente._id}`} className="btn btn-ver me-2"><img src={IconoVer} alt="Icono ver"/></Link>
                                            <a className="btn btn-eliminar" href="/#"><img src={IconoEliminar} alt="Icono eliminar"/></a>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                           

                           <Paginador 
                                elementosPorPagina={pacientesPorPagina}
                                totalElementos={pacientes.length}
                                setPaginaActual={setPaginaActual} 
                                paginaActual={paginaActual} />


                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ListadoPacientes