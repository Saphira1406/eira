import { Container, Row, Col} from 'react-bootstrap';

function Footer() {
    return (
        <footer>
            <Container fluid>
                <Row>
                    <Col lg={6} className="order-1 order-lg-0">
                        <p className="text-center text-lg-start">EIRA 2022 © Todos los derechos reservados</p>
                    </Col>
                    <Col lg={6} className="order-0 order-lg-1 mb-3 mb-lg-0">
                        <ul className="d-lg-flex justify-content-end text-center ps-0">
                            <li><a href="http://localhost:3000/#contacto" className="me-lg-3">Contacto</a></li>
                            <li><a href="/#" className="me-lg-3">Políticas de Privacidad</a></li>
                            <li><a href="/#">Términos y Condiciones</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer