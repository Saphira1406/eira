import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import * as UsuariosService from '../services/auth.service.js'
import { Container, Row, Col, Button, Form, Alert, FloatingLabel, Card} from 'react-bootstrap';

function UsuarioRegistro(){
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [dni, setDni] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [matricula, setMatricula] = useState("")
    const [especialidad, setEspecialidad] = useState("")
    const [obraSocial, setObraSocial] = useState("")
    const [afiliado, setAfiliado] = useState("")
    const [registroPaciente, setRegistroPaciente] = useState(true)
    const [mostrarPassword, setMostrarPassword] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()
    let navigate = useNavigate()
    let usuario = null

    if(!matricula && !especialidad) {
        usuario = {nombre, apellido, email, telefono, dni, password, obraSocial, afiliado}
    } else {
        usuario = {nombre, apellido, email, telefono, dni, password, matricula, especialidad}
    }

    const onSubmit = (data) => {
        console.log(data)
        UsuariosService.registro(usuario)
        .then(response => {
            if(response === false) {
                setError(response.message)
            } else {
                navigate('/login', { replace: true })
            }
        })
    }

    return (
        <main id="sign-in">
            <section>
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto">
                            <Card className="my-5">
                                <Card.Body>
                                    <h1 className="text-center mb-3 pt-4">Registro</h1>
                                    <div className="text-center mb-2">
                                        <button className={`btn m-3 border ${registroPaciente ? "btn-verde": ""}`} onClick={(ev) => setRegistroPaciente(true)}>Soy paciente</button>
                                        <button className={`btn border ${!registroPaciente ? "btn-verde": ""}`} onClick={(ev) => setRegistroPaciente(false)}>Soy profesional de la salud</button>
                                    </div>
                                    <p className="mx-4">(*) Campos obligatorios</p>
                                    {error && <Alert variant="danger" className="mx-4"><p className="mb-0">{error}</p></Alert>}
                                    <Form onSubmit={handleSubmit(onSubmit)} className="mx-4">
                                        <Row>
                                            <FloatingLabel controlId="nombre" label="Nombre*" className="mb-4 floating-distance" as={Col} md={6}>
                                                <Form.Control type="text" placeholder="Nombre*" name="nombre" {...register('nombre', {required: true})} value={nombre} onChange={(ev) => setNombre(ev.target.value)}/>
                                                {errors.nombre && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="apellido" label="Apellido*" md={6}>
                                                <Form.Control type="text" placeholder="Apellido*" name="apellido" {...register('apellido', {required: true})} value={apellido} onChange={(ev) => setApellido(ev.target.value)}/>
                                                {errors.apellido && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                        </Row>
                                        <Row>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="telefono" label="Tel??fono" md={6}>
                                                <Form.Control type="text" placeholder="Tel??fono" name="telefono" value={telefono} onChange={(ev) => setTelefono(ev.target.value)}/>
                                                {errors.telefono && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="email" label="Email*" md={6}>
                                                <Form.Control type="email" placeholder="Email*" name="apellido" {...register('email', { required:true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ })}  value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                                                {errors.email?.type === 'required' && <span className="text-danger">Campo obligatorio</span>}
                                                {errors.email?.type === 'pattern' && <span className="text-danger">Email inv??lido</span>}
                                            </FloatingLabel>
                                        </Row>
                                        <FloatingLabel className="mb-4 floating-distance-2" as={Col} controlId="dni" label="N?? de Documento*">
                                            <Form.Control type="text" placeholder="N?? de Documento*" name="dni" {...register('dni', {required: true})} value={dni} onChange={(ev) => setDni(ev.target.value)}/>
                                            {errors.dni && <span className="text-danger">Campo requerido</span>}
                                        </FloatingLabel>
                                        {!registroPaciente &&
                                        <Row>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="especialidad" label="Especialidad*" md={6}>
                                                <Form.Control type="text" placeholder="Especialidad*" name="especialidad" {...register('especialidad', {required: true})} value={especialidad} onChange={(ev) => setEspecialidad(ev.target.value)}/>
                                                {errors.especialidad && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="matricula" label="Matr??cula*" md={6}>
                                                <Form.Control type="text" placeholder="Matr??cula*" name="matricula" {...register('matricula', {required: true})} value={matricula}  onChange={(ev) => setMatricula(ev.target.value)}/>
                                                {errors.matricula && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                        </Row>
                                        }
                                        {registroPaciente &&
                                        <Row>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="obraSocial" label="Obra Social" md={6}>
                                                <Form.Control type="text" placeholder="Obra Social*" name="obraSocial" value={obraSocial} onChange={(ev) => setObraSocial(ev.target.value)}/>
                                                {errors.obraSocial && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="afiliado" label="N?? de afiliado" md={6}>
                                                <Form.Control type="text" placeholder="N?? de afiliado" name="afiliado" value={afiliado}  onChange={(ev) => setAfiliado(ev.target.value)}/>
                                                {errors.afiliado && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                        </Row>
                                        }
                                        <div className="d-flex align-items-center mb-4">
                                            <FloatingLabel className="floating-distance-2" as={Col} controlId="password" label="Contrase??a*">
                                                <Form.Control type={mostrarPassword ? "text" : "password"} placeholder="Contrase??a*" name="password" {...register('password', {required: true, minLength: 3})} value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                                                {errors.password?.type === 'required' && <span className="text-danger">Campo obligatorio</span>}
                                                {errors.password?.type === 'minLength' && <span className="text-danger">La contrase??a debe tener almenos 3 caracteres</span>}
                                            </FloatingLabel>
                                            <span className="btn btn-ver-pswd" onClick={() => setMostrarPassword(!mostrarPassword)}>  {mostrarPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                </svg> :  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                                </svg>}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-center mb-4">
                                            <Button type="submit" className="btn btn-login">Registrarse</Button>
                                        </div>
                                    </Form>
                                    <p className="text-center pb-4">??Ya ten??s cuenta? <Link to="/login">Inici?? Sesi??n ac??</Link></p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default UsuarioRegistro