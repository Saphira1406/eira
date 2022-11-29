import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import IconoArchivo from '../../imgs/icono-archivo.png'
import { useContext, useEffect, useState } from 'react'
import * as PacientesService from '../../services/pacientes.service.js'
import { UsuarioContext } from '../../context/UsuarioContext'
import { Link, useNavigate } from 'react-router-dom'


function VerHistoriaClinica() {
    
    //const usuarioLogueado = useContext(UsuarioContext)
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    const [historiaClinica, setHistoriaClinica] = useState({})
    let navigate = useNavigate();
    useEffect(() => {
        if(!usuarioLogueado.matricula) {
            PacientesService.traerHistoriaClinica(usuarioLogueado._id)
            .then((resp) => {
            return setHistoriaClinica(resp)
        })
        } else {
            navigate('/profesional/pacientes', { replace: true })
           
        }
       

    }, [])
console.log(historiaClinica)


    return (
        <main>
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo">Historia clínica</h1>
                            
                           {!historiaClinica && <p>Todavía no completaste tu historia clínica. <Link to={`/paciente/formulario-historia-clinica`}>Podes hacerlo acá</Link></p>}
                           
                         
                            {historiaClinica && 
                                <>
                                 <Container className='my-4'>
                                 <Row>
                                     <Col lg={6}>
                                         <p><span className="fw-bold">Paciente:</span> {usuarioLogueado.nombre}</p>
                                         <p><span className="fw-bold">Diagnóstico o condición pre-existente:</span> {historiaClinica.condicion}</p>
                                         <p><span className="fw-bold">Alergias:</span> {historiaClinica.alergia}</p>
                                     </Col>
                                     <Col lg={6}>
                                         <p><span className="fw-bold">N° de Documento:</span> {usuarioLogueado.dni}</p>
                                         <p><span className="fw-bold">Peso:</span> {historiaClinica.peso} kg</p>
                                         <p><span className="fw-bold">Altura:</span> {historiaClinica.altura} cm</p>
                                     </Col>
                                 </Row>
                             </Container>
                              
                              <Accordion alwaysOpen className='mt-3 mb-4'>
                              <Accordion.Item eventKey="0" className='shadow'>
                                  <Accordion.Header>Medicamentos</Accordion.Header>
                                      <Accordion.Body>
                                      <ul className="lista-agregada d-flex justify-content-center mt-3">
                                          {historiaClinica.medicamentos?.map((medicamento, i) => 
                                              <li className="shadow mx-2" key={i}>
                                              <span>{medicamento}</span>
                                              </li>
                                          )}
                                          
                                      </ul>
                                      </Accordion.Body>
                                  </Accordion.Item>
                                  <Accordion.Item eventKey="1" className='shadow my-4'>
                                      <Accordion.Header>Antecedentes personales</Accordion.Header>
                                      <Accordion.Body>
                                      <ul className="lista-antecedentes mt-3">
                                          <li>
                                              <span className="fw-bold">Fumador:</span> {historiaClinica.fumador}
                                          </li>
                                          <li>
                                              <span className="fw-bold">Consume alcohol:</span> {historiaClinica.alcohol}
                                          </li>
                                      </ul>
                                      </Accordion.Body>
                                  </Accordion.Item>

                                  <Accordion.Item eventKey="2" className='shadow my-4'>
                                      <Accordion.Header>Hábitos</Accordion.Header>
                                      <Accordion.Body>
                                      <ul className="lista-antecedentes mt-3">
                                          <li>
                                              <span className="fw-bold">cantidad de comidas por día:</span> {historiaClinica.comidasDiarias}
                                          </li>
                                          <li>
                                              <span className="fw-bold">Sigue una dieta:</span> {historiaClinica.dieta}
                                          </li>
                                          <li>
                                              <span className="fw-bold">Hábitos de sueño:</span> {historiaClinica.habitosSuenio}
                                          </li>
                                         
                                      </ul>
                                      </Accordion.Body>
                                  </Accordion.Item>

                                  <Accordion.Item eventKey="3" className='shadow my-4'>
                                      <Accordion.Header>Antecedentes familiares</Accordion.Header>
                                      <Accordion.Body>
                                      <p className='text-antecedentes'>{historiaClinica.antecedentesFamiliares}</p>
                                      </Accordion.Body>
                                  </Accordion.Item>

                                  <Accordion.Item eventKey="4" className='shadow my-4'>
                                      <Accordion.Header>Exámenes complementarios</Accordion.Header>
                                      <Accordion.Body>
                                      <ul className='lista-archivos d-flex'>
                                          <li>
                                              <img src={IconoArchivo} alt="icono de archivo"/><br/>
                                              <span>archivo.jpg</span>
                                          </li>
                                          <li>
                                              <img src={IconoArchivo} alt="icono de archivo"/><br/>
                                              <span>archivo.jpg</span>
                                          </li>
                                          <li>
                                              <img src={IconoArchivo} alt="icono de archivo"/><br/>
                                              <span>archivo.jpg</span>
                                          </li>
                                          <li>
                                              <img src={IconoArchivo} alt="icono de archivo"/><br/>
                                              <span>archivo.jpg</span>
                                          </li>
                                      </ul>
                                      </Accordion.Body>
                                  </Accordion.Item>
                              </Accordion>
                                </>
                            }
                         
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default VerHistoriaClinica