import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import * as authService from "../services/auth.service.js"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function LoginForm({onLogin}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        authService.login(email, password)
        .then(({usuario, token}) => {
            return onLogin({usuario, token})
        })
        .catch(err=>setError(err.message))
    }


    return (
        <main id="login">
            <section>
                <Container fluid className="h-100">
                    <Row className="h-100">
                        <Col lg={6} className="bg-login py-4 px-5">
                            <p className="text-white login-title mb-0 mt-5 pt-5">¡Bienvenido!</p>
                            <p className="text-white login-subtitle">Para poder acceder tenés que Iniciar Sesión</p>
                        </Col>
                        <Col lg={6} className="bg-form-login pt-5">
                            <Container className="pt-5">
                                <Row className="pt-5">
                                    <Col lg={7} className="mx-auto pt-5">
                                        <h1 className="text-center mb-5">Iniciar Sesión</h1>
                                        {error && <Alert variant="danger"><p className="mb-0">{error}</p></Alert>}
                                        <Form onSubmit={handleSubmit}>
                                            <FloatingLabel controlId="email" label="Email" className="mb-4 floating-distance-2">
                                                <Form.Control type="email" placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                                            </FloatingLabel>
                                            <FloatingLabel controlId="password" label="Contraseña" className="mb-4 floating-distance-2">
                                                <Form.Control type="password" placeholder="Contraseña" name="password" autoComplete="on" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
                                            </FloatingLabel>
                                            <div className="d-flex justify-content-center mb-3">
                                                <Button type="submit" className="btn btn-login">Ingresar</Button>
                                            </div>
                                            <div className="text-center mb-4">
                                                <Link to="/olvideContrasena">¿Olvidaste tu contraseña?</Link>
                                            </div>
                                        </Form>
                                        <p className="text-center">¿No tenés cuenta? <Link to="/registro">Registrate acá</Link></p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default LoginForm