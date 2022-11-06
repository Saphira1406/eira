import { useEffect, useState } from 'react'
import * as TratamientoService from '../services/tratamientos.service.js'
import { useNavigate, useParams } from 'react-router-dom'
import FormComida from '../components/FormComida'
import FormMedicamentos from '../components/FormMedicamentos'
import FormEjercicios from '../components/FormEjercicios'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import * as PacientesService from '../services/pacientes.service.js'
import Collapse from 'react-bootstrap/Collapse'

function Tratamiento() {
    const [comidas, setComidas] = useState([])

    const [medicamentos, setMedicamentos] = useState([])

    const [ejercicios, setEjercicios] = useState([])

    const [paciente, setPaciente] = useState({})

    const { id } = useParams()
    let navigate = useNavigate();

    /** boton subir form */
    function handleSubmit(ev) {

        ev.preventDefault()
        const id_medico = ev.target.id_medico.value
        const id_paciente = ev.target.id_paciente.value

        TratamientoService.crear({tratamiento: {comidas, medicamentos, ejercicios}, id_medico, id_paciente})
        .then(() => {
            navigate(`/`, { replace: true })
            console.log("??")
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

    return (
        <main>
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo">Crear tratamiento</h1>
                            <div className='d-flex justify-content-between mt-4'>
                                <p><span className="fw-bold">Paciente:</span> {paciente.nombre} {paciente.apellido}</p>
                                <p><span className="fw-bold">N° de Documento: </span> ...</p>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Control type="hidden" name="id_medico" value="63239b30953ee51e9b52f154" controlid="id_medico"/>
                                <Form.Control type="hidden" name="id_paciente" value={id} controlid="id_paciente"/>

                                <Form.Group className="my-3" controlid="diagnostico">
                                    <Form.Control type="text" placeholder="Diagnóstico" />
                                </Form.Group>

                                <Button
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                >
                                    click
                                </Button>
                                <Collapse in={open}>
                                    <div id="example-collapse-text">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                    labore wes anderson cred nesciunt sapiente ea proident.
                                    </div>
                                </Collapse>

                            </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id_medico" value="63239b30953ee51e9b52f154" />
                <input type="hidden" name="id_paciente" value={id} />

                <FormComida guardarComidas={guardarComidas} />

                <FormMedicamentos guardarMedicamentos={guardarMedicamentos} />

                <FormEjercicios guardarEjercicios={guardarEjercicios} />

                <button type="submit" className="btn btn-success">Guardar</button>
            </form>

        </main>
    )
}

export default Tratamiento