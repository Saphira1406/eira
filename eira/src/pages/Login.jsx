import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import * as authService from "../services/auth.service.js"
import { Container, Row, Col, Button, Form, Alert, FloatingLabel, Card } from 'react-bootstrap';

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
                <Container>
                    <Row>
                        <Col lg={6} className="mx-auto">
                            <Card className="my-5">
                                <Card.Body>
                                    <h1 className="text-center mb-4 pt-4">Iniciar Sesión</h1>
                                    {error && <Alert variant="danger" className="mx-4"><p className="mb-0">{error}</p></Alert>}
                                    <Form onSubmit={handleSubmit} className="mx-4">
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
                                    <p className="text-center pb-4">¿No tenés cuenta? <Link to="/registro">Registrate acá</Link></p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default LoginForm