import { Alert , Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import { useState, useEffect, useContext } from 'react'
import { UsuarioContext } from "../../context/UsuarioContext";
import * as PacientesService from '../../services/pacientes.service.js'
import * as apiMedicamentos from '../../services/apiMedicamentos.service.js'
import { useNavigate } from 'react-router-dom'

function PedirRecetas() {
    const [medicos, setMedicos] = useState([])
    const [profesional, setProfesional] = useState("")
    const [medicamento, setMedicamento] = useState("")
    const [busqueda, setBusqueda] = useState("")
    const [listaMedicamentos, setListaMedicamentos] = useState([])
    const [busquedaMedicamentos, setBusquedaMedicamentos] = useState("")
    const {usuarioLogueado} = useContext(UsuarioContext)
    let navigate = useNavigate();
    let [success, setSuccess] = useState(false)
    let [error, setError] = useState(false)

    useEffect(() => {
        PacientesService.traerMisMedicos(usuarioLogueado._id)
        .then((resp) => setMedicos(resp))
    }, [busqueda])

    useEffect(() => {
        apiMedicamentos.traer(busquedaMedicamentos)
        .then((resp) => setListaMedicamentos(resp.resultados))
    }, [busquedaMedicamentos])

    function handleSubmit(ev) {
        ev.preventDefault()
        PacientesService.pedidoReceta({profesional, medicamento, usuarioLogueado})
        .then(resp => {
            if(resp === 'creado') {
                setSuccess(true)
            } else {
                setError(true)
            }
        })
    }

    return(
        <main className="fondo-generico">
            <section>
                <Container className='my-5'>
                    <Row>
                        <Col sm={12}>
                            <Alert key="info" variant='info' className='shadow py-5'>
                                <h1 className='fs-4 text-center mb-3'>Pedido de Recetas</h1>
                                <p className='px-4'>Los pasos que ten??s que seguir para poder pedir recetas son:</p>
                                <ol className='px-5'>
                                    <li>Seleccion?? al m??dico al que quer??s pedirle la receta</li>
                                    <li>Seleccion?? el medicamento por el cual est??s haciendo el pedido de receta.</li>
                                </ol>
                            </Alert>
                        </Col>
                        <Col sm={12}>
                            <Card className='shadow mb-2 border-0'>
                                {success &&
                                    <Alert key="success" variant='success'  onClose={() => setSuccess(false)} dismissible>
                                        <p className='px-4 mb-0'>Se env??o el pedido de receta. La vas a recibir por mail.</p>
                                    </Alert>
                                }
                                {error &&
                                    <Alert key="danger" variant='danger'  onClose={() => setError(false)} dismissible>
                                        <p className='px-4 mb-0'>Ocurri?? un problema. Por favor intenta de nuevo m??s tarde.</p>
                                    </Alert>
                                }
                                <Card.Body className='px-5 py-5'>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="profesional">
                                            <Form.Label>Eleg?? el m??dico</Form.Label>
                                            <Select
                                                defaultValue={ {label:"Buscar m??dico por nombre y apellido", value:""} }
                                                options={medicos.map(info => ({label: info.nombre + ' ' + info.apellido, value: info._id}))}
                                                onChange={(ev) => ev ? setProfesional(ev.value):""}
                                                onInputChange={(ev) => setBusqueda(ev)}
                                                noOptionsMessage={() => "No se encuentra el m??dico que busc??s..."}
                                                isSearchable
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="medicamento">
                                            <Form.Label>Eleg?? el medicamento</Form.Label>
                                            <Select
                                                defaultValue={ {label:"Nombre medicamento", value:""} }
                                                options={listaMedicamentos.map(medi => ({ label: medi.nombre, value: medi.nombre}))}
                                                onChange={(ev) => ev ? setMedicamento(ev.value):""}
                                                onInputChange={(ev) => setBusquedaMedicamentos(ev)}
                                                noOptionsMessage={() => "No se encuentra el medicamento que busca..."}
                                                isSearchable
                                            />
                                        </Form.Group>

                                        <div className="d-flex justify-content-center">
                                            <Button type="submit" className="btn btn-agregar">
                                                Pedir Receta
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default PedirRecetas