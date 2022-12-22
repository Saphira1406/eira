import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Pacientes from '../imgs/pacientes.png'
import Recetas from '../imgs/medicamentos.png'
import ImgPerfil from '../imgs/perfil.png'
import { UsuarioContext } from "../context/UsuarioContext";
import BuscarPaciente from '../imgs/icono-buscar-azul.png'

function Dashboard() {
    const {usuarioLogueado} = useContext(UsuarioContext)
    let navigate = useNavigate();

    useEffect(
        () => {
            if(!usuarioLogueado.matricula) {
                navigate('/paciente', { replace: true })
            }
          // eslint-disable-next-line
        }, [])

    return (
        <main id="dashboard" className="pt-5">
            <section className="pt-5">
                <h1 className="visually-hidden">Dashboard Médicos</h1>
                <Container fluid className="pt-5 px-5">
                    <Row className="g-5">
                        <Col md={6} lg={3}>
                            <Link to={`/profesional/pacientes`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Pacientes} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-verde">Mis pacientes</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to="/medico/pedidos-recetas" className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Recetas} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-amarillo">Recetas médicas</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to={`/solicitudes`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={BuscarPaciente} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-azul">Agregar pacientes</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to={`/mi-perfil/${usuarioLogueado._id}`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={ImgPerfil} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-naranja">Mi perfil</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Dashboard