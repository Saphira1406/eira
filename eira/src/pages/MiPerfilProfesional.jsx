import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as ProfesionalService from "../services/profesionales.service.js"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IconoUsuario from '../imgs/icono-usuario-perfil.png'
import IconoEmail from '../imgs/icono-email.png'
import IconoTelefono from '../imgs/icono-telefono.png'
import IconoIdentificacion from '../imgs/icono-identificacion.png'
import Swal from 'sweetalert2'

function MiPerfilProfesional () {
    const [profesional, setProfesional] = useState({})
    const { id } = useParams()

    useEffect(() => {
        ProfesionalService.traerPorId(id)
        .then( resp => setProfesional(resp) )
    }, [])

    function handleSubmit(ev) {
        ev.preventDefault()
       /* if(window.confirm("¿Eliminar tratamiento?")) {
            ProfesionalService.eliminar(id)
            .then(() => alert("Profesional eliminado"))
        }*/

        Swal.fire({
            title: '¿Seguro que quiere eliminar su usuario?',
            text: "No podrás volver atrás",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
                ProfesionalService.eliminar(id)
                .then(() => alert("Profesional eliminado"))
                localStorage.removeItem('usuario')
            
            }
          })
    }


    return( 
        <main>
            <section>
                <Container className="py-5">
                    <Row>
                        <Col lg='10' className="mx-auto">
                            <Card body className='shadow px-2 pt-2 bt-azul'>
                                <Container>
                                    <Row>
                                        <Col lg="8">
                                            <h1 className="titulo mb-3">{profesional.nombre} {profesional.apellido}</h1>
                                            <p className="fw-bold mb-1">{profesional.especialidad}</p>
                                            <p className="fw-bold mb-2">Matrícula: {profesional.matricula}</p>
                                            <p className="mb-2"><img src={IconoEmail} alt="Icono de email"/> {profesional.email}</p>
                                            <p className="mb-2"><img src={IconoTelefono} alt="Icono de email"/> {profesional.telefono}</p>
                                            <p><img src={IconoIdentificacion} alt="Icono de email"/> {profesional.dni}</p>
                                        </Col>
                                        <Col lg="4">
                                            <img src={IconoUsuario} alt="Icono de usuario" className="img-fluid"/>
                                        </Col>
                                        <Col>
                                            <div className="d-flex justify-content-center align-items-center mt-2 mb-5">
                                                <Link to={`/editar-perfil/${id}`} state={{profesional}} className="btn me-3 btn-editar-perfil">Editar información</Link>
                                                <form onSubmit={handleSubmit}>
                                                    <button type="submit" className="btn btn-eliminar-perfil">Eliminar perfil</button>
                                                </form>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default MiPerfilProfesional