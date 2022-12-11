import React, { useContext } from "react";
import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import LogoEiraBlanco from '../imgs/logo-eira-blanco.png';
import { Link } from "react-router-dom";
import { UsuarioContext } from '../context/UsuarioContext'

function NavbarEira() {
    const [idProfesional, setIdProfesional] = useState("63239b30953ee51e9b52f154")
    //const [user , setUser] = useState({})

    const {usuarioLogueado} = useContext(UsuarioContext)
    //const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    console.log("aca",usuarioLogueado)

    return (
        <header>
            <Navbar className="bgNavbarGreen fw-bold" expand="lg" variant="dark">
                <Container fluid>
                    <Link to={`/`} ><img src={LogoEiraBlanco} alt="Logo de Eira" /> </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to={`/`} className="nav-link">Inicio</Link>
                            <Nav.Link href="#funciones">Beneficios</Nav.Link>
                            <Nav.Link href="#pacientes">Pacientes</Nav.Link>
                            <Nav.Link href="#profesionales">Profesionales</Nav.Link>
                            <Nav.Link href="#contacto">Contacto</Nav.Link>
                            {!usuarioLogueado && <Link to={`/login`} className="nav-link">Iniciar sesión</Link>}
                            {!usuarioLogueado && <Link to={`/registro`} className="nav-link">Registrarse</Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavbarEira