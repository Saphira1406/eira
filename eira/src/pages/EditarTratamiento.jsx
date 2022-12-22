import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as TratamientoService from '../services/tratamientos.service'
import {Form, Button, Card, Container, Row, Col, FloatingLabel} from 'react-bootstrap'

function EditarTratamiento(props) {
    const location = useLocation()
    const { id } = useParams()
    const [tratamiento, setTratamiento] = useState({})
    const [tratamientoEditado, setTratamientoEditado] = useState({})
    const [medicamento, setMedicamento] = useState(location.state.medicamento?.nombre || "")
    const [horas, setHoras] = useState(location.state.medicamento?.horas || "")
    const [fecha, setFecha] = useState(location.state.medicamento?.fecha || "")
    const [comida, setComida] = useState(location.state.comida || "")
    const [ejercicio, setEjercicio] = useState(location.state.ejercicio?.ejercicio || "")
    const [video, setVideo] = useState(location.state.ejercicio?.video || "")
    const [repeticiones, setRepeticiones] = useState(location.state.ejercicio?.repeticiones || "")
    let navigate = useNavigate();
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))

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

    useEffect(() => {
        TratamientoService.traerPorId(id)
        .then( (resp) => {
            setTratamiento(resp)
        } )
        console.log(location.state.comida)
    }, [])

    function handleSubmit(ev) {
        ev.preventDefault()
        const tipo = "medicamentos"
        TratamientoService.editarMedicamento(id,{nombre:medicamento, horas, fecha, id: location.state.medicamento.id}, tipo)
        .then( () => {
            console.log("se ha editado")
            navigate(`/ver-tratamiento/${location.state.idPaciente}`, { replace: true })
        } )
    }

    function handleSubmitComidas(ev) {
        ev.preventDefault()
        TratamientoService.editarComida(id, location.state.comida, comida)
        .then(() => {
            navigate(`/ver-tratamiento/${location.state.idPaciente}`, { replace: true })
            console.log("editado comida")
        })
    }

    function handleSubmitEjercicios(ev) {
        ev.preventDefault()
        const tipo = "ejercicios"
        TratamientoService.editarMedicamento(id,{ejercicio, repeticiones, video, id: location.state.ejercicio.id}, tipo)
        .then( () => {
            console.log("se ha editado")
            navigate(`/ver-tratamiento/${location.state.idPaciente}`, { replace: true })
        } )
        console.log("acaa")
    }

    useEffect(() => {
        console.log(tratamiento.tratamiento?.medicamentos[0])
        console.log(location.state.idPaciente)
    }, [tratamiento])

    return (
        <main className="fondo-generico">
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo mb-4">Editar tratamiento</h1>

                            {location.state.comida &&
                            <Form onSubmit={handleSubmitComidas}>
                                <FloatingLabel className="my-3" controlId="comida" label="Nombre comida a restringir">
                                    <Form.Control type="text" placeholder="Nombre comida a restringir" name="comida" value={comida} onChange={(ev) => setComida(ev.target.value)}/>
                                </FloatingLabel>
                                <div className="d-flex justify-content-center">
                                    <Button type="submit" className="btn btn-editar">
                                        Actualizar comida
                                    </Button>
                                </div>
                            </Form>}

                            {location.state.medicamento &&
                            <Form onSubmit={handleSubmit}>
                                <Form.Control type="hidden" name="id_medico" value="63239b30953ee51e9b52f154" controlid="id_medico"/>
                                <Form.Control type="hidden" name="id_paciente" value={id} controlid="id_paciente"/>
                                <FloatingLabel className="mb-4" controlId="medicamento" label="Nombre del medicamento">
                                    <Form.Control type="text" placeholder="Nombre del medicamento" name="medicamento" value={medicamento} onChange={(ev) => setMedicamento(ev.target.value)}/>
                                </FloatingLabel>
                                <FloatingLabel className="mb-4" controlId="horas" label="¿Cáda cuánto tiempo debe tomar el medicamento? (Indicar en cant. de horas)">
                                    <Form.Control type="number" placeholder="¿Cáda cuánto tiempo debe tomar el medicamento? (Indicar en cant. de horas)" name="horas" value={horas} onChange={(ev) => setHoras(ev.target.value)}/>
                                </FloatingLabel>
                                <FloatingLabel className="mb-4" controlId="finalizacion" label="Fecha en que finaliza la toma de medicamentos">
                                    <Form.Control type="date" placeholder="Fecha en que finaliza la toma de medicamentos" name="finalizacion" value={fecha} onChange={ (ev) => setFecha(ev.target.value)}/>
                                </FloatingLabel>
                                <div className="d-flex justify-content-center">
                                    <Button type="submit" className="btn btn-editar">
                                        Actualizar medicamento
                                    </Button>
                                </div>
                            </Form>}

                            {location.state.ejercicio &&
                            <Form onSubmit={handleSubmitEjercicios}>
                                <FloatingLabel className="mb-4" controlId="ejercicio" label="Nombre del ejercicio">
                                    <Form.Control type="text" placeholder="Nombre del ejercicio" name="ejercicio" value={ejercicio} onChange={(ev) => setEjercicio(ev.target.value)}/>
                                </FloatingLabel>
                                <FloatingLabel className="mb-4" controlId="repeticiones" label="Indicar cantidad de repeticiones">
                                    <Form.Control type="text" placeholder="Indicar cantidad de repeticiones" name="repeticiones" value={repeticiones} onChange={e => setRepeticiones(e.target.value)}/>
                                </FloatingLabel>
                                <FloatingLabel className="mb-4" controlId="video" label="URL de video">
                                    <Form.Control type="text" placeholder="URL de video" name="video" value={video} onChange={e => setVideo(e.target.value)}/>
                                </FloatingLabel>
                                <div className="d-flex justify-content-center">
                                    <Button type="submit" className="btn btn-editar">
                                        Actualizar ejercicio
                                    </Button>
                                </div>
                            </Form>
                            }
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}


export default EditarTratamiento