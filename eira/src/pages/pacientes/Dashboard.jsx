import React from "react";
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tratamiento from '../../imgs/tratamiento.png'
import Historia from '../../imgs/historia-clinica.png'
import Recetas from '../../imgs/medicamentos.png'
import ImgPerfil from '../../imgs/perfil.png'

function Dashboard() {
    let { id } = useParams();

    return (
        <main id="dashboard" className="pt-5">
            <section className="pt-5">
                <h1 className="visually-hidden">Dashboard Pacientes</h1>
                <Container fluid className="pt-5 px-5">
                    <Row className="g-5">
                        <Col className="mx-5">
                            <div className="text-decoration-none">
                                <div className="bg-white text-center shadow py-5">
                                    <img src={Tratamiento} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                    <p className="mb-0 title-dashboard text-azul">Mis tratamientos</p>
                                </div>
                            </div>
                        </Col>
                        <Col className="mx-5">
                            <Link to={`/paciente/historia-clinica`} className="text-decoration-none">
                                <div className="bg-white text-center shadow py-5">
                                    <img src={Historia} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                    <p className="mb-0 title-dashboard text-verde">Mis historia clínica</p>
                                </div>
                            </Link>
                        </Col>
                        <Col className="mx-5">
                            <div className="text-decoration-none">
                                <div className="bg-white text-center shadow py-5">
                                    <img src={Recetas} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                    <p className="mb-0 title-dashboard text-amarillo">Recetas médicas</p>
                                </div>
                            </div>
                        </Col>
                        <Col className="mx-5">
                            <Link to={`/home/perfil-paciente/${id}`} className="text-decoration-none">
                                <div className="bg-white text-center shadow py-5">
                                    <img src={ImgPerfil} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                    <p className="mb-0 title-dashboard text-naranja">Mi perfil</p>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Dashboard