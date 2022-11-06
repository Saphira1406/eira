import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
    return (
        <footer>
            <Container fluid>
                <Row>
                    <Col>
                        <p>EIRA 2022 © Todos los derechos reservados</p>
                    </Col>
                    <Col>
                        <ul className="d-flex justify-content-end">
                            <li><a href="#" className="me-3">Contacto</a></li>
                            <li><a href="#" className="me-3">Políticas de Privacidad</a></li>
                            <li><a href="#">Términos y Condiciones</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer