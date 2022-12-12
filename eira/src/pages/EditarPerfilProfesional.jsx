import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as ProfesionalService from "../services/profesionales.service.js"
import { Card, Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap'

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

    function handleSubmit(ev) {
        ev.preventDefault()
        console.log("aca")
        ProfesionalService.editar(id, {nombre, apellido, telefono, especialidad, email, dni, matricula})
        .then( () =>  navigate(`/mi-perfil/${id}`, { replace: true }) )
    }

    return (
        <main id="perfil">
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo mb-3">Editar perfil</h1>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="nombre" label="Nombre">
                                                <Form.Control type="text" placeholder="Nombre" name="nombre" value={nombre} onChange={(ev) => setNombre(ev.target.value)}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="apellido" label="Apellido">
                                                <Form.Control type="text" placeholder="Apellido" name="apellido" value={apellido} onChange={(ev) => setApellido(ev.target.value)}/>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="telefono" label="Teléfono">
                                                <Form.Control type="text" placeholder="Teléfono" name="telefono" value={telefono} onChange={(ev) => setTelefono(ev.target.value)}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="email" label="Email">
                                                <Form.Control type="text" placeholder="Email" name="email" value={email} onChange={(ev) => setEmail(ev.target.value)} disabled/>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>

                                    <FloatingLabel className="my-3 floating-distance-2" controlId="dni" label="N° de documento">
                                        <Form.Control type="text" placeholder="N° de documento" name="dni" value={dni} onChange={(ev) => setDni(ev.target.value)} disabled/>
                                    </FloatingLabel>

                                    <Row>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="especialidad" label="Especialidad">
                                                <Form.Control type="text" placeholder="Especialidad" name="especialidad" value={especialidad} onChange={(ev) => setEspecialidad(ev.target.value)}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="matricula" label="Matrícula">
                                                <Form.Control type="text" placeholder="N° de matrícula" name="matricula" value={matricula} onChange={(ev) => setMatricula(ev.target.value)} disabled/>
                                            </FloatingLabel>
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