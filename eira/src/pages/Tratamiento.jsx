import { useContext, useEffect, useState } from 'react'
import * as TratamientoService from '../services/tratamientos.service.js'
import { useNavigate, useParams } from 'react-router-dom'
import FormComida from '../components/FormComida'
import FormMedicamentos from '../components/FormMedicamentos'
import FormEjercicios from '../components/FormEjercicios'
import { Card, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap'
import * as PacientesService from '../services/pacientes.service.js'
import { UsuarioContext } from '../context/UsuarioContext.jsx'

function Tratamiento() {
    const [comidas, setComidas] = useState([])
    const [medicamentos, setMedicamentos] = useState([])
    const [ejercicios, setEjercicios] = useState([])
    const [paciente, setPaciente] = useState({})
    const {usuarioLogueado} = useContext(UsuarioContext)
    const { id } = useParams()
    let navigate = useNavigate();

    useEffect(
        () => {
            if(!usuarioLogueado.matricula) {
                navigate('/', { replace: true })
            }
            if(!usuarioLogueado.verificado) {
                navigate('/falta-verificacion', {replace: true})
            }
          // eslint-disable-next-line
        }, [])

    /** boton subir form */
    function handleSubmit(ev) {
        ev.preventDefault()
        const id_medico = ev.target.id_medico.value
        const id_paciente = ev.target.id_paciente.value
        const profesional_nombre = ev.target.profesional_nombre.value
        const profesional_apellido = ev.target.profesional_apellido.value
        const diagnostico = ev.target.diagnostico.value

        TratamientoService.crear({tratamiento: {comidas, medicamentos, ejercicios}, id_medico, id_paciente, profesional_nombre, profesional_apellido,diagnostico})
        .then(() => {
            navigate(`/profesional/pacientes`, { replace: true })
        })
        setComidas([])
        setMedicamentos([])
    }

    function guardarComidas(listaComidas) {
        console.log("--> Lista",listaComidas)
        setComidas(listaComidas)
    }

    function guardarMedicamentos(listaMedicamentos) {
        console.log("-->lista med", listaMedicamentos)
        setMedicamentos(listaMedicamentos)
    }

    function guardarEjercicios(listaEjercicioos) {
        setEjercicios(listaEjercicioos)
    }

    useEffect(() => {
        PacientesService.traerPorId(id)
        .then(resp => setPaciente(resp))
        console.log(medicamentos)
    }, [medicamentos])

    console.log("lol",usuarioLogueado.nombre)

    return (
        <main className="fondo-generico">
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo">Crear tratamiento</h1>
                            <div className='d-md-flex justify-content-between mt-4'>
                                <p><span className="fw-bold">Paciente:</span> {paciente.nombre} {paciente.apellido}</p>
                                <p><span className="fw-bold">N° de Documento: </span> {paciente.dni}</p>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Control type="hidden" name="id_medico" value={usuarioLogueado._id} controlid="id_medico"/>
                                <Form.Control type="hidden" name="profesional_nombre" value={usuarioLogueado.nombre} controlid="profesional_nombre"/>
                                <Form.Control type="hidden" name="profesional_apellido" value={usuarioLogueado.apellido} controlid="profesional_apellido"/>
                                <Form.Control type="hidden" name="id_paciente" value={id} controlid="id_paciente"/>

                                <FloatingLabel className="my-3" controlid="diagnostico" label="Diagnóstico">
                                    <Form.Control type="text" placeholder="Diagnóstico" name="diagnostico"/>
                                </FloatingLabel>

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Comidas Restringidas</Card.Header>
                                    <Card.Body className="px-4">
                                        <FormComida guardarComidas={guardarComidas} />
                                    </Card.Body>
                                </Card>

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Medicamentos</Card.Header>
                                    <Card.Body className="px-4">
                                        <FormMedicamentos guardarMedicamentos={guardarMedicamentos} />
                                    </Card.Body>
                                </Card>

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Ejercicios</Card.Header>
                                    <Card.Body className="px-4">
                                        <FormEjercicios guardarEjercicios={guardarEjercicios} />
                                    </Card.Body>
                                </Card>

                                <div className='mt-5 mb-3 d-flex justify-content-center'>
                                    <button type="submit" className="btn btn-crear-tratamiento">Crear tratamiento</button>
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

export default Tratamiento