import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as ProfesionalService from "../services/profesionales.service.js"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function EditarPerfilProfesional() {
    const location = useLocation()
    // const [profesional, setProfesional] = useState({}) porque no lee  en vez de location.state
    const [nombre, setNombre] = useState(location.state.profesional?.nombre || "")
    const [apellido, setApellido] = useState(location.state.profesional?.apellido || "")
    const [telefono, setTelefono] = useState(location.state.profesional?.telefono || "")
    const [especialidad, setEspecialidad] = useState(location.state.profesional?.especialidad || "")
    const [email, setEmail] = useState(location.state.profesional?.email || "")
    const [dni, setDni] = useState(location.state.profesional?.dni || "")
    const [matricula, setMatricula] = useState(location.state.profesional?.matricula || "")

    const { id } = useParams()
    let navigate = useNavigate();

    useEffect(() => {
        /*ProfesionalService.traerPorId(id)
        .then( resp => setProfesional(resp) )
        console.log(location.state.profesional)*/
    }, [])

    function handleSubmit(ev) {
        ev.preventDefault()
        console.log("aca")
        ProfesionalService.editar(id, {nombre, apellido, telefono, especialidad, email, dni, matricula})
        .then( () =>  navigate(`/mi-perfil/${id}`, { replace: true }) )
    }
    

    return (
        <main>
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo mb-3">Editar perfil</h1>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="my-3" controlId="nombre">
                                                <Form.Control type="text" placeholder="Nombre" name="nombre" value={nombre} onChange={(ev) => setNombre(ev.target.value)}/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="my-3" controlId="apellido">
                                                <Form.Control type="text" placeholder="Apellido" name="apellido" value={apellido} onChange={(ev) => setApellido(ev.target.value)}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="my-3" controlId="telefono">
                                                <Form.Control type="text" placeholder="Teléfono" name="telefono" value={telefono} onChange={(ev) => setTelefono(ev.target.value)}/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="my-3" controlId="email">
                                                <Form.Control type="text" placeholder="Email" name="email" value={email} onChange={(ev) => setEmail(ev.target.value)} disabled/>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="my-3" controlId="dni">
                                        <Form.Control type="text" placeholder="N° de documento" name="dni" value={dni} onChange={(ev) => setDni(ev.target.value)} disabled/>
                                    </Form.Group>

                                    <Row>
                                        <Col>
                                            <Form.Group className="my-3" controlId="especialidad">
                                                <Form.Control type="text" placeholder="Especialidad" name="especialidad" value={especialidad} onChange={(ev) => setEspecialidad(ev.target.value)}/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="my-3" controlId="matricula">
                                                <Form.Control type="text" placeholder="N° de matrícula" name="matricula" value={matricula} onChange={(ev) => setMatricula(ev.target.value)} disabled/>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-center my-3">
                                        <Button type="submit" className="btn btn-editar">
                                            Actualizar perfil
                                        </Button>
                                    </div>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default EditarPerfilProfesional