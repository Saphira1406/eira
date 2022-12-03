import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as PacienteService from "../../services/pacientes.service.js"
import FloatingLabel from 'react-bootstrap/FloatingLabel';

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
    function agregarMedicamento(ev) {
        setMedicamentos(prev => [...prev, medicamento]);
        setMedicamento("");
    }

    function handleSubmit(ev) {
        ev.preventDefault()
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
                                <FloatingLabel className="my-3" controlId="condicion" label="¿Ya tenés un diagnóstico o alguna condición pre-existente? De ser así ¿cuál?">
                                    <Form.Control aria-describedby="passwordHelpBlock" placeholder="¿Ya tenés un diagnóstico o alguna condición pre-existente? De ser así ¿cuál?" value={condicion} onChange={(ev) => setCondicion(ev.target.value)} />
                                </FloatingLabel>

                                <FloatingLabel className="my-3" controlId="alergia" label="¿Tenés alguna alergía? De ser así, ¿cuál?">
                                    <Form.Control placeholder="¿Tenés alguna alergía? De ser así, ¿cuál?" value={alergia} onChange={(ev) => setAlergia(ev.target.value)} />
                                </FloatingLabel>

                                <Row className="my-3">
                                    <Col>
                                        <FloatingLabel controlId="peso" label="¿Cuál es tu peso?">
                                            <Form.Control type="number" placeholder="¿Cuál es tu peso?" name="peso" value={peso} onChange={(ev) => setPeso(ev.target.value)}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="altura" label="¿Cuál es tu altura?">
                                            <Form.Control type="number" placeholder="¿Cuál es tu altura?" name="altura" value={altura} onChange={(ev) => setAltura(ev.target.value)}/>
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Medicamentos</Card.Header>
                                    <Card.Body className="px-4">
                                        <FloatingLabel className="my-3" controlId="medicamento" label="Nombre del medicamento que estás tomando actualmente">
                                            <Form.Control type="text" placeholder="Nombre del medicamento que estás tomando actualmente" name="medicamento" value={medicamento} onChange={(ev) => setMedicamento(ev.target.value)}/>
                                        </FloatingLabel>
                                            <div className="d-flex justify-content-center">
                                                <Button type="button" onClick={agregarMedicamento} className="btn btn-agregar">
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
                                    </Card.Body>
                                </Card>

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Antecedentes personales</Card.Header>
                                    <Card.Body className="px-4">
                                        <Row>
                                            <Col>
                                                <FloatingLabel className="my-3" controlId="fumador" label="¿Sos fumador?">
                                                    <Form.Select aria-label="¿Sos fumador?" value={fumador} onChange={(ev) => setFumador(ev.target.value)}>
                                                        <option value="No">No</option>
                                                        <option value="Si">Si</option>
                                                        <option value="Ocasionalmente">Ocasionalmente</option>
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                            <Col>
                                                <FloatingLabel className="my-3" controlId="alcohol" label="¿Consumís alcohol?">
                                                    <Form.Select aria-label="Elige una opcion" value={alcohol} onChange={(ev) => setAlcohol(ev.target.value)}>
                                                        <option value="No">No</option>
                                                        <option value="Si">Si</option>
                                                        <option value="Ocasionalmente">Ocasionalmente</option>
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Hábitos</Card.Header>
                                    <Card.Body className="px-4">
                                        <FloatingLabel className="my-3" controlId="comidaDiaria" label="¿Cuántas comidas por día ingerís?">
                                            <Form.Control type="number" name="comidaDiaria" placeholder="¿Cuántas comidas por día ingerís?" value={comidasDiarias} onChange={(ev) => setComidasDiarias(ev.target.value)}/>
                                        </FloatingLabel>
                                        <FloatingLabel className="my-3" controlId="dieta" label="¿Seguís alguna dieta?">
                                            <Form.Control as="textarea" rows={3} name="dieta" placeholder="¿Seguís alguna dieta?" value={dieta} onChange={(ev) => setDieta(ev.target.value)}/>
                                        </FloatingLabel>
                                        <FloatingLabel className="my-3" controlId="habitosSuenio" label="¿Cómo son tus hábitos de sueño?">
                                            <Form.Control as="textarea" rows={3} name="habitosSuenio" placeholder="¿Cómo son tus hábitos de sueño?" value={habitosSuenio} onChange={(ev) => setHabitosSuenio(ev.target.value)}/>
                                        </FloatingLabel>
                                    </Card.Body>
                                </Card>

                                <Card className="border-0 shadow my-4">
                                    <Card.Header className="tratamiento-header">Antecedentes familiares</Card.Header>
                                    <Card.Body className="px-4">
                                        <FloatingLabel className="my-3" controlId="antecedentesFamiliares" label="Indicá tus antecedentes familiares">
                                            <Form.Control as="textarea" rows={3} name="antecedentesFamiliares" placeholder="Indicá tus antecedentes familiares" value={antecedentesFamiliares} onChange={(ev) => setAntecedentesFamiliares(ev.target.value)}/>
                                        </FloatingLabel>
                                    </Card.Body>
                                </Card>

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