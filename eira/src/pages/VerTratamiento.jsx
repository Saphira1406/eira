import * as TratamientosService from '../services/tratamientos.service.js'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import * as PacientesService from '../services/pacientes.service.js'
import * as ProfesionalesService from '../services/profesionales.service.js'
import IconoEliminar from '../imgs/icono-cruz-eliminar.png'
import { UsuarioContext } from '../context/UsuarioContext.jsx'
import Swal from 'sweetalert2'

function VerTratamiento() {
    const { id } = useParams()
    const [tratamientos, setTratamientos] = useState([])
    const [tratamientosDelProfesional, setTratamientosDelProfesional] = useState([])
    const [paciente, setPaciente] = useState({})
    const {usuarioLogueado} = useContext(UsuarioContext)

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

    return (
        <main>
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo">Ver tratamiento</h1>
                            <Row>
                                <Col lg={6}>
                                    <p><span className="fw-bold">Paciente:</span> {paciente.nombre} {paciente.apellido}</p>
                                    <p><span className="fw-bold">N° de Documento: </span> {paciente.dni}</p>
                                </Col>
                                <Col lg={12} >
                                    {!tratamientos.length && usuarioLogueado.matricula && <p className="h4 my-3"><span className="fw-bold">{paciente.nombre} {paciente.apellido}</span> no tiene un tratamiento asignado, si desea crear uno, <Link to={`/tratamiento/${id}`}>entrá acá</Link></p>}
                                    {!tratamientos.length && !usuarioLogueado.matricula && <p className="h4 my-3"><span className="fw-bold">{paciente.nombre} {paciente.apellido}</span> todavía no le asignaron tratamientos...</p>}
                                </Col>
                            </Row>

                            {usuarioLogueado.matricula && tratamientosDelProfesional.map((tratamiento, j) =>

                            <Card body className='shadow px-2 pt-2 my-3' key={j}>
                                {!usuarioLogueado.matricula && <p><b>Profesional:</b> {tratamiento.profesional.nombre} {tratamiento.profesional.apellido}</p>}

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Comidas Restringidas</Card.Header>
                                    <Card.Body className="px-4">
                                        <ul className="lista-agregada d-flex justify-content-center">
                                            {tratamiento.tratamiento.comidas?.map((comida, k) =>
                                                <li className="shadow mx-2" key={k}>
                                                <span>{comida}</span><br/>
                                                    {usuarioLogueado.matricula && <> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{comida,idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                    <Link className="btn-eliminar-trat mt-2">Eliminar</Link></> }
                                                </li>
                                                )}
                                            </ul>
                                    </Card.Body>
                                </Card>

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Medicamentos</Card.Header>
                                    <Card.Body className="px-4">
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

                                                    {usuarioLogueado.matricula && <span className='d-flex justify-content-center mt-3'>
                                                        <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{medicamento, idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                        <Link className="btn-eliminar-trat mt-2">Eliminar</Link>
                                                    </span>}
                                                </li>
                                            )}
                                            </ul>
                                    </Card.Body>
                                </Card>

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Ejercicios</Card.Header>
                                    <Card.Body className="px-4">
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

                                                {usuarioLogueado.matricula && <span className='d-flex justify-content-center mt-4'>
                                                    <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{ejercicio, idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                    <Link className="btn-eliminar-trat mt-2">Eliminar</Link>
                                                </span>}
                                            </li>
                                            )}
                                            </ul>
                                    </Card.Body>
                                </Card>

                                <Card.Footer className="bg-transparent border-0">
                                    {usuarioLogueado.matricula && <form onSubmit={handleSubmitBorrarTratamiento}>
                                        <div className='d-flex justify-content-center'>
                                            <button type="submit" className="border-0 link-eliminar">Eliminar tratamiento</button>
                                            <input type="hidden" name="idTratamiento" value={tratamiento._id}/>
                                        </div>
                                    </form>}
                                    </Card.Footer>
                                </Card>
                                )}

                                {!usuarioLogueado.matricula && tratamientos.map((tratamiento, j) =>

                                <Card body className='shadow px-2 pt-2 my-3' key={j}>
                                    {!usuarioLogueado.matricula && <p><b>Profesional:</b> {tratamiento.profesional.nombre} {tratamiento.profesional.apellido}</p>}
                                    <Card className="border-0 shadow my-4">
                                        <Card.Header className="tratamiento-header">Comidas Restringidas</Card.Header>
                                        <Card.Body className="px-4">
                                            <ul className="lista-agregada d-flex justify-content-center">
                                                {tratamiento.tratamiento.comidas?.map((comida, k) =>
                                                    <li className="shadow mx-2" key={k}>
                                                    <span>{comida}</span><br/>
                                                        {usuarioLogueado.matricula && <> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{comida,idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                        <Link className="btn-eliminar-trat mt-2">Eliminar</Link></> }
                                                    </li>
                                                    )}
                                                </ul>
                                        </Card.Body>
                                    </Card>

                                    <Card className="border-0 shadow my-4">
                                        <Card.Header className="tratamiento-header">Medicamentos</Card.Header>
                                        <Card.Body className="px-4">
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

                                                        {usuarioLogueado.matricula && <span className='d-flex justify-content-center mt-3'>
                                                            <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{medicamento, idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                            <Link className="btn-eliminar-trat mt-2">Eliminar</Link>
                                                        </span>}
                                                    </li>
                                                )}
                                                </ul>
                                        </Card.Body>
                                    </Card>

                                    <Card className="border-0 shadow my-4">
                                        <Card.Header className="tratamiento-header">Ejercicios</Card.Header>
                                        <Card.Body className="px-4">
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

                                                    {usuarioLogueado.matricula && <span className='d-flex justify-content-center mt-4'>
                                                        <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{ejercicio, idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2 me-2">Editar</Link>
                                                        <Link className="btn-eliminar-trat mt-2">Eliminar</Link>
                                                    </span>}
                                                </li>
                                                )}
                                                </ul>
                                        </Card.Body>
                                    </Card>

                                    <Card.Footer className="bg-transparent border-0">
                                    {usuarioLogueado.matricula && <form onSubmit={handleSubmitBorrarTratamiento}>
                                        <div className='d-flex justify-content-center'>
                                            <button type="submit" className="border-0 link-eliminar">Eliminar tratamiento</button>
                                            <input type="hidden" name="idTratamiento" value={tratamiento._id}/>
                                        </div>
                                    </form>}
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