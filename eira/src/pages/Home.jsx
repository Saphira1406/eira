import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ImgHeader from '../imgs/img-header.png'
import Flecha from '../imgs/flecha-abajo.png'
import IconoHistorial from '../imgs/icono-historial-home.png'
import IconoNotificacion from '../imgs/icono-notificaciones-home.png'
import IconoCompartir from '../imgs/icono-compartir-home.png'

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
                            <img src={ImgHeader} alt="Ilustración representando aplicación de salud"/>
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
                                    <img src={IconoHistorial} alt="Icono historia clínica" className='mb-3'/>
                                    <p className='titulo-item mb-1'>Ver tratamientos</p>
                                    <p className='texto-item mb-0'>Como paciente podrás ver tus tratamiento médicos y recibir recordatorios. Como profesional de la salud podrás ver la adherencia de tus pacientes a los tratamientos.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoNotificacion} alt="Icono historia clínica" className='mb-3'/>
                                    <p className='titulo-item mb-1'>Recordatorios</p>
                                    <p className='texto-item mb-0'>Recordatorios sobre medicamentos y ejecicios que se deben realizar según lo indicado en cada tratamiento, de manera personalizada.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoCompartir} alt="Icono historia clínica" className='mb-3'/>
                                    <p className='titulo-item mb-1'>Compartir historia clínica</p>
                                    <p className='texto-item mb-0'>Los pacientes pueden compartir sus historias clínicas con los profesionales de la salud, facilitando las consultas y el asignamiento de un tratamiento.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Home