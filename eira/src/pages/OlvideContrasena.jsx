import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import * as UsuariosService from '../services/usuarios.service.js'
import { Container, Row, Col, Card, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'

function OlvideContrasena() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    let navigate = useNavigate()

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault(e)
        console.log(email)
        UsuariosService.olvideContrasena({email})
        .then(response => {
            if(response.response === false ) {
                setError(response.message)
            } else {
                setMessage('Ya enviamos el link al email indicado. No te olvidés de revisar en spam')
            }
        })
        .catch(err=> console.log(err))
    }

    return (
        <main className="fondo-generico">
            <section>
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto mt-5 py-5">
                            <Card body className="px-4 py-3">
                                <h1 className="font-weight-bold text-center h2">Olvidé mi contraseña</h1>
                                {message && <Alert key="success" variant="success">{message}</Alert>}
                                <p className="text-center mb-3">Ingresá tu correo electrónico, y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</p>
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel className="mb-4 floating-distance" controlId="email" label="Email*">
                                        <Form.Control type="text" placeholder="Email*" name="email" value={email} onChange={handleEmail}/>
                                    </FloatingLabel>
                                    {error && <p className="text-danger">{error}</p>}
                                    <div className="d-flex justify-content-center">
                                        <Button type="submit" className="btn-editar">Enviar enlace</Button>
                                    </div>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default OlvideContrasena