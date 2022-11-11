import { useState, useEffect } from 'react'
import * as PacientesService from '../services/pacientes.service.js'
import * as ProfesionalesService from '../services/profesionales.service.js'
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
import IconoHistoriaClinica from '../imgs/icono-historia-clinica.png'
import { Button } from 'react-bootstrap'
import Paginador from './Paginador.jsx'

function ListadoPacientes() {
    const [pacientes, setPacientes] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    const [pacientesPorPagina, setPacientesPorPagina] = useState(2)
    const idProfesional = "63239b30953ee51e9b52f154" // cambiar para usar 

    useEffect(() => {
        // PacientesService.traer()
        // .then((pacientes) => {
        //     setPacientes(pacientes)
        // })
        ProfesionalesService.traerPacientes(idProfesional)
        .then( (resp) => setPacientes(resp))
    }, [])

   

    const indexUltimoPaciente = paginaActual * pacientesPorPagina
    const indexPrimerPaciente = indexUltimoPaciente - pacientesPorPagina
    const pacientesActuales = pacientes.slice(indexPrimerPaciente, indexUltimoPaciente)
   
    // busqueda
    //const resultados = !busqueda ? pacientes : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.dni.includes(busqueda))
    const resultados = !busqueda ? pacientesActuales : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.dni.includes(busqueda))


    function handleSubmitBorrarTratamiento(ev) {
        ev.preventDefault()
        console.log(ev.target.idPaciente.value)

        ProfesionalesService.eliminarPaciente(idProfesional,ev.target.idPaciente.value)
        .then( (resp) => {
            ProfesionalesService.traerPacientes(idProfesional)
            .then( (resp) => setPacientes(resp))
        })
        
    }

   
    function noti(){
        console.log("hola")
        if (!("Notification" in window)) {
            // Check if the browser supports notifications
            alert("This browser does not support desktop notification");
          } else if (Notification.permission === "granted") {
            // Check whether notification permissions have already been granted;
            // if so, create a notification
            setTimeout( () => {
                const notification = new Notification("Hora de comer");
            }, 3000)
            
            // …
          } else if (Notification.permission !== "denied") {
            // We need to ask the user for permission
            Notification.requestPermission().then((permission) => {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                const notification = new Notification("Hi there!");
                // …
              }
            });
          }
    }


    return (
        <section id="listadoPacientes">
            <Container>
                <Row>
                    <Col>
                    <button onClick={noti}>notificacion</button>
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
                                            <form onSubmit={handleSubmitBorrarTratamiento} >
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