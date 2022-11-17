import { useState, useEffect, useContext } from 'react'
import * as ProfesionalesService from '../services/profesionales.service.js'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import IconoCrear from '../imgs/icono-crear.png'
import IconoVer from '../imgs/icono-ver.png'
import IconoEliminar from '../imgs/icono-eliminar.png'
import IconoHistoriaClinica from '../imgs/icono-historia-clinica.png'
import Paginador from './Paginador.jsx'
import { UsuarioContext } from '../context/UsuarioContext'

function ListadoPacientes() {
    const [pacientes, setPacientes] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [pacientesPorPagina, setPacientesPorPagina] = useState(2)

    //const usuarioLogueado = useContext(UsuarioContext)
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    //const idProfesional = "63239b30953ee51e9b52f154" 

    useEffect(() => {
        console.log("holaaaaaa",usuarioLogueado)
        ProfesionalesService.traerPacientes(usuarioLogueado?._id)
        .then( (resp) => setPacientes(resp))
    }, [])

   

    const indexUltimoPaciente = paginaActual * pacientesPorPagina
    const indexPrimerPaciente = indexUltimoPaciente - pacientesPorPagina
    const pacientesActuales = pacientes.slice(indexPrimerPaciente, indexUltimoPaciente)
   
    // busqueda
    //const resultados = !busqueda ? pacientes : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.dni.includes(busqueda))
    const resultados = !busqueda ? pacientesActuales : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.dni.includes(busqueda))


    function handleSubmitEliminarPaciente(ev) {
        ev.preventDefault()
        console.log(ev.target.idPaciente.value)

        if(window.confirm("¿Eliminar paciente de tu lista?")) { 
            ProfesionalesService.eliminarPaciente(usuarioLogueado._id,ev.target.idPaciente.value)
            .then( (resp) => {
            ProfesionalesService.traerPacientes(usuarioLogueado._id)
            .then( (resp) => setPacientes(resp))
        })
        }
       
        
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
                                        <th>Email</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {resultados.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado pacientes</td></tr>}
                                {resultados.map((paciente, i) =>
                                    <tr key={i}>
                                        <td>{paciente.dni}</td>
                                        <td>{paciente.nombre}</td>
                                        <td>{paciente.apellido}</td>
                                        <td>{paciente.email}</td>
                                        <td className='d-flex'>
                                            <Link to={`/tratamiento/${paciente._id}`} className="btn btn-crear me-2"><img src={IconoCrear} alt="Icono crear"/></Link>
                                            <Link to={`/ver-tratamiento/${paciente._id}`} className="btn btn-ver me-2"><img src={IconoVer} alt="Icono ver"/></Link>
                                            <Link to={`/historia-clinica/${paciente._id}`} className="btn btn-ver-historia me-2"><img src={IconoHistoriaClinica} alt="Icono crear"/></Link>
                                            <form onSubmit={handleSubmitEliminarPaciente} >
                                                <button type="submit" className="btn btn-eliminar"><img src={IconoEliminar} alt="Icono eliminar"/></button>
                                                <input type="hidden" name="idPaciente" value={paciente._id}/>
                                            </form>
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