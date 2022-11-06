import React from "react";
import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoEiraBlanco from '../imgs/logo-eira-blanco.png';
import IconoUsuarioBlanco from '../imgs/icono-usuario-blanco.png';
import IconoUsuarioAzul from '../imgs/icono-usuario-azul.png';

function NavbarEira() {
    const [idProfesional, setIdProfesional] = useState("63239b30953ee51e9b52f154")

    return (
        <header>
            <Navbar className="bgNavbarGreen" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img src={LogoEiraBlanco} alt="Logo de Eira" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title={
                            <img src={IconoUsuarioBlanco} alt="Icono de usuario blanco" className="img-fluid"/>
                        } id="basic-nav-dropdown">
                        <NavDropdown.Item>
                            <img src={IconoUsuarioAzul} alt="Icono de usuario color azul" className="img-fluid"/>
                            <span className="nombreNavbar">Nombre de usuario</span>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={'/'}>Inicio</NavDropdown.Item>
                        <NavDropdown.Item href={'/'}>Pacientes</NavDropdown.Item>
                        <NavDropdown.Item href={`/mi-perfil/${idProfesional}`}>Mi Perfil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Cerrar Sesión</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavbarEira