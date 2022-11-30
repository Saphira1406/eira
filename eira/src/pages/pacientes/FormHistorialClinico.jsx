import { useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as PacienteService from "../../services/pacientes.service.js"

function FormHistorialClinico () {

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    const [condicion, setCondicion] = useState("")
    const [alergia, setAlergia] = useState("")
    const [peso, setPeso] = useState("")
    const [altura, setAltura] = useState("")
    const [medicamento, setMedicamento] = useState("")
    const [medicamentos, setMedicamentos] = useState([])
    const [fumador, setFumador] = useState("Si")
    const [alcohol, setAlcohol] = useState("Si")
    const [comidasDiarias, setComidasDiarias] = useState("")
    const [dieta, setDieta] = useState("")
    const [habitosSuenio, setHabitosSuenio] = useState("")
    const [antecedentesFamiliares, setAntecedentesFamiliares] = useState("")
    //const [antecendentesFamiliares, setAntecendentesFamiliares] = useState("") para fotos?
    let navigate = useNavigate();
    function agregarComida(ev) {
        
        setMedicamentos(prev => [...prev, medicamento]);
        setMedicamento("");
    }

    function handleSubmit(ev) {

        ev.preventDefault()
        console.log("holaaaa") // me falta guardar el historial, luego hacer test para que todo funcione en la demo de HOY

        PacienteService.crearHistoriaClinica(
            usuarioLogueado._id,
            { 
              paciente: usuarioLogueado._id,
              condicion,
              alergia,
              peso,
              altura,
              medicamentos,
              fumador,
              alcohol,
              comidasDiarias,
              dieta,
              habitosSuenio,
              antecedentesFamiliares
            })
            .then(resp =>  navigate(`/paciente/historia-clinica`, { replace: true }))

    }


    return (
        <main>
        <section>
            <Container className="py-5">
                <Row>
                    <Col>
                    <Card body className='shadow px-2 pt-2'>
                    <h1 className="titulo">Mi historia clínica</h1>
                        <Form onSubmit={handleSubmit}>
                        <Accordion alwaysOpen className='mt-4'>
                                    <Accordion.Item eventKey="0" className='shadow'>
                                        <Accordion.Header>Diagnóstico o condición preexistente</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group className="my-3" controlId="condicion">
                                            <Form.Label className="visually-hidden">Diagnóstico o condición preexistente</Form.Label>
                                                <Form.Control as="textarea" aria-describedby="passwordHelpBlock" placeholder="Condicion preexistente" rows={3} value={condicion} onChange={(ev) => setCondicion(ev.target.value)} />
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>
                              
                                    <Accordion.Item eventKey="1" className='shadow my-4'>
                                        <Accordion.Header>¿Tenés alguna alergía? De ser así, ¿cuál?</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group className="my-3" controlId="alergia">
                                                <Form.Label className="visually-hidden">¿Tenés alguna alergía? De ser así, ¿cuál?</Form.Label>
                                                <Form.Control as="textarea" placeholder="..." rows={3} value={alergia} onChange={(ev) => setAlergia(ev.target.value)} />
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="2" className='shadow my-4'>
                                        <Accordion.Header>Peso y altura</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group  className="my-3" controlId="peso">
                                                <Form.Label className="visually-hidden">Peso</Form.Label>
                                                <Form.Control type="number" placeholder="Peso" name="peso" value={peso} onChange={(ev) => setPeso(ev.target.value)}/>
                                            </Form.Group>
                                            <Form.Group className="my-3" controlId="altura">
                                                <Form.Label className="visually-hidden">Altura</Form.Label>
                                                <Form.Control type="number" placeholder="Altura" name="altura" value={altura} onChange={(ev) => setAltura(ev.target.value)}/>
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="3" className='shadow my-4'>
                                        <Accordion.Header>Medicamentos</Accordion.Header>
                                        <Accordion.Body>
                                        <Form.Group className="my-3" controlId="comida">
                                            <Form.Control type="text" placeholder="Nombre medicamento" name="medicamento" value={medicamento} onChange={(ev) => setMedicamento(ev.target.value)}/>
                                         </Form.Group>
                                            <div className="d-flex justify-content-center">
                                                <Button type="button" onClick={agregarComida} className="btn btn-agregar">
                                                    Agregar
                                                </Button>
                                            </div>
                                            <p className="fw-bold text-center mt-4">Lista medicamentos</p>
                                                <ul className="lista-agregada d-flex justify-content-center">
                                                    {medicamentos.map((comida, i) =>
                                                    <li key={i} className="shadow mx-2">
                                                        {comida}
                                                    </li>
                                                    )}
                                                </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="4" className='shadow my-4'>
                                        <Accordion.Header>¿Sos fumador?</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group className="my-3" controlId="fumador">
                                                <Form.Label className="visually-hidden">¿Sos fumador?</Form.Label>
                                                <Form.Select aria-label="Elige una opcion" value={fumador} onChange={(ev) => setFumador(ev.target.value)}>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>
                                                    <option value="Ocasionalmente">Ocasionalmente</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="5" className='shadow my-4'>
                                        <Accordion.Header>¿Consumís alcohol?</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group className="my-3" controlId="alcohol">
                                                <Form.Label className="visually-hidden">¿Consumís alcohol?</Form.Label>
                                                <Form.Select aria-label="Elige una opcion" value={alcohol} onChange={(ev) => setAlcohol(ev.target.value)}>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>
                                                    <option value="Ocasionalmente">Ocasionalmente</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="6" className='shadow my-4'>
                                        <Accordion.Header>¿Cuántas comidas por día ingerís?</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group className="my-3" controlId="comidaDiaria">
                                                <Form.Label className="visually-hidden">¿Cuántas comidas por día ingerís?</Form.Label>
                                                <Form.Control type="number" name="comidaDiaria" value={comidasDiarias} onChange={(ev) => setComidasDiarias(ev.target.value)}/>
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="7" className='shadow my-4'>
                                        <Accordion.Header>¿Seguís alguna dieta?</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group className="my-3" controlId="dieta">
                                                <Form.Label className="visually-hidden">¿Seguís alguna dieta?</Form.Label>
                                                <Form.Control as="textarea" rows={3} name="dieta" placeholder="..." value={dieta} onChange={(ev) => setDieta(ev.target.value)}/>
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="8" className='shadow my-4'>
                                        <Accordion.Header>¿Cómo son tus hábitos de sueño?</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group className="my-3" controlId="habitosSuenio">
                                                <Form.Label className="visually-hidden">¿Cómo son tus hábitos de sueño?</Form.Label>
                                                <Form.Control as="textarea" rows={3} name="habitosSuenio" placeholder="..." value={habitosSuenio} onChange={(ev) => setHabitosSuenio(ev.target.value)}/>
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="9" className='shadow my-4'>
                                        <Accordion.Header>Indicá tus antecedentes familiares</Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Group className="my-3" controlId="antecedentesFamiliares">
                                                <Form.Label className="visually-hidden">Indicá tus antecedentes familiares</Form.Label>
                                                <Form.Control as="textarea" rows={3} name="antecedentesFamiliares" placeholder="..." value={antecedentesFamiliares} onChange={(ev) => setAntecedentesFamiliares(ev.target.value)}/>
                                            </Form.Group>
                                        </Accordion.Body>
                                    </Accordion.Item>



                                   
                        </Accordion>
                           

                            <div className='mt-5 mb-3 d-flex justify-content-center'>
                                <button type="submit" className="btn btn-crear-tratamiento">Guardar mi historial clínico</button>
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

export default FormHistorialClinico