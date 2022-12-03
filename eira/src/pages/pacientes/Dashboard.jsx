import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Tratamiento from '../../imgs/tratamiento.png'
import Historia from '../../imgs/historia-clinica.png'
import Recetas from '../../imgs/medicamentos.png'
import ImgPerfil from '../../imgs/perfil.png'
import { UsuarioContext } from "../../context/UsuarioContext";

function Dashboard() {
    const {usuarioLogueado} = useContext(UsuarioContext)

    return (
        <main id="dashboard" className="pt-5">
            <section className="pt-5">
                <h1 className="visually-hidden">Dashboard Pacientes</h1>
                <Container fluid className="pt-5 px-5">
                    <Row className="g-5">
                        <Col>
                            <Link to={`/ver-tratamiento/${usuarioLogueado._id}`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Tratamiento} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-azul">Mis tratamientos</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col>
                            <Link to={`/paciente/historia-clinica`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Historia} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-verde">Mis historia clínica</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col>
                            <Link to="#"className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Recetas} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-amarillo">Recetas médicas</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col>
                            <Link to={`/home/perfil-paciente/${usuarioLogueado._id}`} className="text-decoration-none">
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