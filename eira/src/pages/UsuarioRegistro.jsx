import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import * as UsuariosService from '../services/auth.service.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

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
    const [registroPaciente, setRegistroPaciente] = useState(true)

    const { register, formState: { errors }, handleSubmit } = useForm()
    let usuario = null
    if(!matricula && !especialidad) {
        usuario = {nombre, apellido, email, telefono, dni, password}
    } else {
        usuario = {nombre, apellido, email, telefono, dni, password, matricula, especialidad}
    }

    let navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
        UsuariosService.registro(usuario)
        .then(response => {
            if(response === false) {
                setError(response.message)
            } else {
                navigate('/login', { replace: true })
            }
            //navigate('/', { replace: true })
            console.log(response)
        })
    }

    return (
        <main id="login">
            <section>
                <Container fluid className="h-100">
                    <Row className="h-100">
                        <Col lg={6} className="bg-login py-4 px-5">
                            <p className="text-white login-title mb-0 mt-5 pt-5">¡Bienvenido!</p>
                            <p className="text-white login-subtitle">Para poder acceder tenés que Iniciar Sesión</p>
                        </Col>
                        <Col lg={6} className="bg-form-login pt-5">
                            <Container className="pt-5">
                                <Row className="pt-5">
                                    <Col lg={7} className="mx-auto pt-5">
                                        <h1 className="text-center mb-3">Registro</h1>
                                        <div className="text-center mb-2">
                                            <button className={`btn m-3 border ${registroPaciente ? "btn-verde": ""}`} onClick={(ev) => setRegistroPaciente(true)}>Soy paciente</button>
                                            <button className={`btn border ${!registroPaciente ? "btn-verde": ""}`} onClick={(ev) => setRegistroPaciente(false)}>Soy profesional de la salud</button>
                                        </div>
                                        <p>(*) Campos obligatorios</p>
                                        {error && <Alert variant="danger"><p className="mb-0">{error}</p></Alert>}
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Row>
                                                <Form.Group className="mb-4" as={Col} controlId="nombre">
                                                    <Form.Control type="text" placeholder="Nombre*" name="nombre" {...register('nombre', {required: true})} value={nombre} onChange={(ev) => setNombre(ev.target.value)}/>
                                                    {errors.nombre && <span className="text-danger">Campo requerido</span>}
                                                </Form.Group>
                                                <Form.Group className="mb-4" as={Col} controlId="apellido">
                                                    <Form.Control type="text" placeholder="Apellido*" name="apellido" {...register('apellido', {required: true})} value={apellido} onChange={(ev) => setApellido(ev.target.value)}/>
                                                    {errors.apellido && <span className="text-danger">Campo requerido</span>}
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group className="mb-4" as={Col} controlId="telefono">
                                                    <Form.Control type="text" placeholder="Teléfono" name="telefono" value={telefono} onChange={(ev) => setTelefono(ev.target.value)}/>
                                                    {errors.telefono && <span className="text-danger">Campo requerido</span>}
                                                </Form.Group>
                                                <Form.Group className="mb-4" as={Col} controlId="email">
                                                    <Form.Control type="email" placeholder="Email*" name="apellido" {...register('email', { required:true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ })}  value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                                                    {errors.email?.type === 'required' && <span className="text-danger">Campo obligatorio</span>}
                                                    {errors.email?.type === 'pattern' && <span className="text-danger">Email inválido</span>}
                                                </Form.Group>
                                            </Row>
                                            <Form.Group className="mb-4" as={Col} controlId="dni">
                                                <Form.Control type="text" placeholder="N° de Documento*" name="dni" {...register('dni', {required: true})} value={dni} onChange={(ev) => setDni(ev.target.value)}/>
                                                {errors.dni && <span className="text-danger">Campo requerido</span>}
                                            </Form.Group>
                                            {!registroPaciente &&
                                            <Row>
                                                <Form.Group className="mb-4" as={Col} controlId="especialidad">
                                                    <Form.Control type="text" placeholder="Especialidad*" name="especialidad" {...register('especialidad', {required: true})} value={especialidad} onChange={(ev) => setEspecialidad(ev.target.value)}/>
                                                    {errors.especialidad && <span className="text-danger">Campo requerido</span>}
                                                </Form.Group>
                                                <Form.Group className="mb-4" as={Col} controlId="matricula">
                                                    <Form.Control type="text" placeholder="Matrícula*" name="matricula" {...register('matricula', {required: true})} value={matricula}  onChange={(ev) => setMatricula(ev.target.value)}/>
                                                    {errors.matricula && <span className="text-danger">Campo requerido</span>}
                                                </Form.Group>
                                            </Row>
                                            }
                                            <Form.Group className="mb-4" as={Col} controlId="password">
                                                <Form.Control type="text" placeholder="Contraseña*" name="password" {...register('password', {required: true, minLength: 3})} value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                                                {errors.password?.type === 'required' && <span className="text-danger">Campo obligatorio</span>}
                                                {errors.password?.type === 'minLength' && <span className="text-danger">La contraseña debe tener almenos 3 caracteres</span>}
                                            </Form.Group>
                                            <div className="d-flex justify-content-center mb-4">
                                                <Button type="submit" className="btn btn-login">Registrarse</Button>
                                            </div>
                                        </Form>
                                        <p className="text-center">¿Ya tenés cuenta? <Link to="/login">Iniciá Sesión acá</Link></p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default UsuarioRegistro