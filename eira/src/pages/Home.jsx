import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ImgHeader from '../imgs/img-header.png'
import Flecha from '../imgs/flecha-abajo.png'
import IconoHistorial from '../imgs/icono-historial-home.png'
import IconoNotificacion from '../imgs/icono-notificaciones-home.png'
import IconoCompartir from '../imgs/icono-compartir-home.png'
import MockupCelular from '../imgs/celular-app-mockup.png'
import ImgProfesionales from '../imgs/profesionales-de-la-salud.png'

function Home() {
    return (
        <main>
            <header id='header-home'>
                <Container>
                    <Row className='align-items-center'>
                        <Col lg={6}>
                            <h1 className='mb-2'>EIRA TE AYUDA A RECORDAR SIN IMPORTAR DÓNDE ESTÉS</h1>
                            <p className='mb-4'>Ayudamos a los pacientes a recordar sus tratamientos y a los medicos a hacer el seguimiento del mismo.</p>
                            <Button>Registrate</Button>
                        </Col>
                        <Col lg={6}>
                            <img src={ImgHeader} alt="Ilustración representando aplicación de salud" className='img-fluid'/>
                        </Col>
                    </Row>
                </Container>
            </header>
            <div className='text-center down-div'>
                <a href='#funciones' className='down-button'><img src={Flecha} alt="Flecha hacia abajo"/></a>
            </div>

            <section className='py-5' id='funciones'>
                <Container className='py-5'>
                    <Row md={1} lg={3} className="g-5">
                        <Col>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoHistorial} alt="Icono historia clínica" className='mb-3 img-fluid'/>
                                    <p className='titulo-item mb-1'>Ver tratamientos</p>
                                    <p className='texto-item mb-0'>Como paciente podrás ver tus tratamiento médicos y recibir recordatorios. Como profesional de la salud podrás ver la adherencia de tus pacientes a los tratamientos.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoNotificacion} alt="Icono historia clínica" className='mb-3 img-fluid'/>
                                    <p className='titulo-item mb-1'>Recordatorios</p>
                                    <p className='texto-item mb-0'>Recordatorios sobre medicamentos y ejecicios que se deben realizar según lo indicado en cada tratamiento, de manera personalizada.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoCompartir} alt="Icono historia clínica" className='mb-3 img-fluid'/>
                                    <p className='titulo-item mb-1'>Compartir historia clínica</p>
                                    <p className='texto-item mb-0'>Los pacientes pueden compartir sus historias clínicas con los profesionales de la salud, facilitando las consultas y el asignamiento de un tratamiento.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section id='pacientes' className='py-5'>
                <Container className='py-4'>
                    <Row className='align-items-center'>
                        <Col lg={6} className="text-center">
                            <img src={MockupCelular} alt="Pantallas de celular con vistas de la app Eira" className='img-fluid'/>
                        </Col>
                        <Col lg={6}>
                            <h2 className='mb-3'><span className='text-verde-claro'>NO</span> TE OLVIDES MÁS</h2>
                            <p>Eira facilita a los pacientes elseguimiento de sus tratamientos médicos prolongados, ayudándoles a recordar qué ejercicios tienen que hacer, qué medicamentos deben tomar y si tienen algún tipo de restricción con respecto a las comidas que pueden ingerir.</p>
                            <p className='mb-4'>Eira permite tener toda esta información en el celular, para poder aceder desde cualquier lugar y en cualquier momento.</p>
                            <Button>¡Quiero registrarme como paciente!</Button>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id='profesionales' className='py-5'>
                <Container className='py-4'>
                    <Row className='align-items-center'>
                        <Col lg={6}>
                            <h2 className='mb-3'>SEGUÍ EL <span className='text-verde-claro'>PROGRESO</span> DE TUS PACIENTES</h2>
                            <p className='mb-4'>Con Eira seguí el progreso de tus pacientes en los tratamientos asignados sin que deban asistir al consultorio y alivianando la agenda de turnos.</p>
                            <Button>¡Quiero registrarme como profesional!</Button>
                        </Col>
                        <Col lg={6} className="text-center">
                            <img src={ImgProfesionales} alt="Profesionales de la salud" className='img-fluid'/>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id='contacto' className='py-5'>
                <Container className='py-4'>
                    <Row>
                        <Col lg={8} className='mx-auto'>
                            <h2 className='text-center'>CONTACTO</h2>
                            <p className='text-center mb-4'>Si querés recibir más información, no dudes en contactarnos</p>
                            <Form>
                                <Row className='mb-3'>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="nombre">
                                            <Form.Control type="text" placeholder="Nombre" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Control type="email" placeholder="Email" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-4" controlId="mensaje">
                                    <Form.Control as="textarea" rows={3} placeholder="Tu mensaje" />
                                </Form.Group>
                                <div className='d-flex justify-content-center'>
                                    <Button type="submit">Enviar</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Home