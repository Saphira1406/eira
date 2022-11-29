import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as PacienteService from "../../services/pacientes.service.js"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IconoUsuario from '../../imgs/icono-usuario-perfil.png'
import IconoEmail from '../../imgs/icono-email.png'
import IconoTelefono from '../../imgs/icono-telefono.png'
import IconoIdentificacion from '../../imgs/icono-identificacion.png'
import { UsuarioContext } from '../../context/UsuarioContext'
import Swal from 'sweetalert2'


function MiPerfilPaciente () {
    const [paciente, setPaciente] = useState({})
    const { id } = useParams()
    //const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    const {usuarioLogueado} = useContext(UsuarioContext)

    useEffect(() => {
        PacienteService.traerPorId(id)
        .then( resp => setPaciente(resp) )
    }, [id])

    function handleSubmit(ev) {
        ev.preventDefault()
        /*if(window.confirm("¿Querés eliminar tu usuario?")) {
            PacienteService.eliminar(usuarioLogueado._id)
            .then(() => alert("Eliminaste tu usuario eliminado"))
            localStorage.removeItem('usuario')
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
                PacienteService.eliminar(usuarioLogueado._id)
                .then(() =>   Swal.fire(
                    'Se borró correctamente',
                    '',
                    'success'
                  ))
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
                                            <h1 className="titulo mb-3">{paciente.nombre} {paciente.apellido}</h1>
                                            <p className="mb-2"><img src={IconoEmail} alt="Icono de email"/> {paciente.email}</p>
                                            <p className="mb-2"><img src={IconoTelefono} alt="Icono de email"/> {paciente.telefono}</p>
                                            <p><img src={IconoIdentificacion} alt="Icono de email"/> {paciente.dni}</p>
                                        </Col>
                                        <Col lg="4">
                                            <img src={IconoUsuario} alt="Icono de usuario" className="img-fluid"/>
                                        </Col>
                                        <Col>
                                            <div className="d-flex justify-content-center align-items-center mt-2 mb-5">
                                                <Link to={`/paciente/editar-perfil/${id}`} state={{paciente}} className="btn me-3 btn-editar-perfil">Editar información</Link>
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

export default MiPerfilPaciente