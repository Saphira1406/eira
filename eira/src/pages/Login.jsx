import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import * as authService from "../services/auth.service.js"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../imgs/logo-eira.png'

function LoginForm({onLogin, funcNav}) {
    
    useEffect(() => {
        funcNav(false);;
      }, []);

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
                            <img src={Logo} alt="Logo de Eira" className="img-fluid mb-custom"/>
                            <p className="text-white login-title mb-0 mt-5 pt-5">¡Bienvenido!</p>
                            <p className="text-white login-subtitle">Para poder acceder tenés que Iniciar Sesión</p>
                        </Col>
                        <Col lg={6} className="bg-form-login pt-5">
                            <Container className="pt-5">
                                <Row className="pt-5">
                                    <Col lg={7} className="mx-auto pt-5">
                                        <h1 className="text-center mb-5">Iniciar Sesión</h1>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-4" controlId="email">
                                                <Form.Control type="email" placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                                            </Form.Group>
                                            <Form.Group className="mb-5" controlId="password">
                                                <Form.Control type="password" placeholder="Contraseña" name="password" autoComplete="on" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <div className="d-flex justify-content-center mb-3">
                                                <Button type="submit" className="btn btn-login">Ingresar</Button>
                                            </div>
                                            {error && <p>{error}</p>}
                                            <div className="text-center mb-4">
                                                <Link to="/olvideContrasena">¿Olvidaste tu contraseña?</Link>
                                            </div>
                                        </Form>
                                        <p className="text-center">¿No tenés cuenta? <Link to="/registro">Registrate acá</Link></p>
                                    </Col>
                                </Row>
                            </Container>
                            {/* <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="password" name="password" autoComplete="on" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-form w-100">Iniciar Sesión</button>
                                <div className="text-center">
                                    <Link to="/olvideContrasena">¿Olvidaste tu contraseña?</Link>
                                </div>
                            </form>
                            <div className="col-12 mt-5 justify-content-center">
                                <p>¿No tenés cuenta? <Link to="/registro">registrate</Link></p>
                            </div>
                            {error && <p>{error}</p>} */}
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default LoginForm