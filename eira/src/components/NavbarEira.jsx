import React, { useContext } from "react";
import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoEiraBlanco from '../imgs/logo-eira-blanco.png';
import IconoUsuarioBlanco from '../imgs/icono-usuario-blanco.png';
import IconoUsuarioAzul from '../imgs/icono-usuario-azul.png';
import { Link } from "react-router-dom";
import Logout from './Logout'
import { UsuarioContext } from '../context/UsuarioContext'


function NavbarEira() {
    const [idProfesional, setIdProfesional] = useState("63239b30953ee51e9b52f154")

    //const usuarioLogueado = useContext(UsuarioContext)
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))

    return (
        <header>
            <Navbar className="bgNavbarGreen" expand="lg">
                <Container fluid>
                   
                    <Link to={`/`} ><img src={LogoEiraBlanco} alt="Logo de Eira" /> </Link> 
                   
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title={
                            <img src={IconoUsuarioBlanco} alt="Icono de usuario blanco" className="img-fluid"/>
                        } id="basic-nav-dropdown">
                            {usuarioLogueado && 
                                 <NavDropdown.Item>
                                 <img src={IconoUsuarioAzul} alt="Icono de usuario color azul" className="img-fluid"/>
                                 <span className="nombreNavbar">{usuarioLogueado?.nombre}</span>
                             </NavDropdown.Item>
                            }
                       
                        <NavDropdown.Divider />
                        <Link to={`/`} className="dropdown-item">Inicio</Link>
                        {!usuarioLogueado && <Link to={`/login`} className="dropdown-item">Iniciar sesión</Link>} 
                        {usuarioLogueado?.matricula && <Link to={`/profesional/pacientes`} className="dropdown-item">Lista mis pacientes</Link>} 
                        {usuarioLogueado && <Link to={`/mi-perfil/${idProfesional}`} className="dropdown-item">Mi perfil</Link>} 
                        {usuarioLogueado && <Link to={`/paciente/historia-clinica`} className="dropdown-item">Mi historia clínico</Link>} 
                        <NavDropdown.Divider />
                        {usuarioLogueado && <Logout />}
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavbarEira