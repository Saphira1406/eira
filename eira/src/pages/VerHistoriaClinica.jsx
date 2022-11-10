import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import IconoArchivo from '../imgs/icono-archivo.png'

function VerHistoriaClinica() {
    return (
        <main>
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo">Ver tratamiento</h1>
                            <Container className='my-4'>
                                <Row>
                                    <Col lg={6}>
                                        <p><span className="fw-bold">Paciente:</span> Nombre del paciente</p>
                                        <p><span className="fw-bold">Diagnóstico o condición pre-existente:</span> Lorem ipsum</p>
                                        <p><span className="fw-bold">Alergias:</span> Lorem ipsum</p>
                                    </Col>
                                    <Col lg={6}>
                                        <p><span className="fw-bold">N° de Documento:</span> 22.222.222</p>
                                        <p><span className="fw-bold">Peso:</span> XXkg</p>
                                        <p><span className="fw-bold">Altura:</span> X,XXcm</p>
                                    </Col>
                                </Row>
                            </Container>
                            <Accordion alwaysOpen className='mt-3 mb-4'>
                                    <Accordion.Item eventKey="0" className='shadow'>
                                        <Accordion.Header>Medicamentos</Accordion.Header>
                                            <Accordion.Body>
                                            <ul className="lista-agregada d-flex justify-content-center mt-3">
                                                <li className="shadow mx-2">
                                                <span>Medicamento 1</span>
                                                </li>
                                                <li className="shadow mx-2">
                                                <span>Medicamento 2</span>
                                                </li>
                                                <li className="shadow mx-2">
                                                <span>Medicamento 3</span>
                                                </li>
                                            </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1" className='shadow my-4'>
                                            <Accordion.Header>Antecedentes personales</Accordion.Header>
                                            <Accordion.Body>
                                            <ul className="lista-antecedentes mt-3">
                                                <li>
                                                    <span className="fw-bold">Fumador:</span> Sí
                                                </li>
                                                <li>
                                                    <span className="fw-bold">Consume alcohol:</span> Ocasionalmente
                                                </li>
                                            </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2" className='shadow my-4'>
                                            <Accordion.Header>Hábitos</Accordion.Header>
                                            <Accordion.Body>
                                            <ul className="lista-antecedentes mt-3">
                                                <li>
                                                    <span className="fw-bold">cantidad de comidas por día:</span> 3
                                                </li>
                                                <li>
                                                    <span className="fw-bold">Sigue una dieta:</span> No
                                                </li>
                                                <li>
                                                    <span className="fw-bold">Hábitos de sueño:</span> Lorem ipsum
                                                </li>
                                            </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3" className='shadow my-4'>
                                            <Accordion.Header>Antecedentes familiares</Accordion.Header>
                                            <Accordion.Body>
                                            <p className='text-antecedentes'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3" className='shadow my-4'>
                                            <Accordion.Header>Exámenes complementarios</Accordion.Header>
                                            <Accordion.Body>
                                            <ul className='lista-archivos d-flex'>
                                                <li>
                                                    <img src={IconoArchivo} alt="icono de archivo"/><br/>
                                                    <span>archivo.jpg</span>
                                                </li>
                                                <li>
                                                    <img src={IconoArchivo} alt="icono de archivo"/><br/>
                                                    <span>archivo.jpg</span>
                                                </li>
                                                <li>
                                                    <img src={IconoArchivo} alt="icono de archivo"/><br/>
                                                    <span>archivo.jpg</span>
                                                </li>
                                                <li>
                                                    <img src={IconoArchivo} alt="icono de archivo"/><br/>
                                                    <span>archivo.jpg</span>
                                                </li>
                                            </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default VerHistoriaClinica