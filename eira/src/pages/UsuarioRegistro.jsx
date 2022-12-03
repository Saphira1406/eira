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
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card'

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

    const { register, formState: { errors }, handleSubmit } = useForm()
    let usuario = null
    if(!matricula && !especialidad) {
        usuario = {nombre, apellido, email, telefono, dni, password, obraSocial, afiliado}
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
                                            <FloatingLabel controlId="nombre" label="Nombre*" className="mb-4 floating-distance" as={Col}>
                                                <Form.Control type="text" placeholder="Nombre*" name="nombre" {...register('nombre', {required: true})} value={nombre} onChange={(ev) => setNombre(ev.target.value)}/>
                                                {errors.nombre && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="apellido" label="Apellido*">
                                                <Form.Control type="text" placeholder="Apellido*" name="apellido" {...register('apellido', {required: true})} value={apellido} onChange={(ev) => setApellido(ev.target.value)}/>
                                                {errors.apellido && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                        </Row>
                                        <Row>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="telefono" label="Teléfono">
                                                <Form.Control type="text" placeholder="Teléfono" name="telefono" value={telefono} onChange={(ev) => setTelefono(ev.target.value)}/>
                                                {errors.telefono && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="email" label="Email*">
                                                <Form.Control type="email" placeholder="Email*" name="apellido" {...register('email', { required:true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ })}  value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                                                {errors.email?.type === 'required' && <span className="text-danger">Campo obligatorio</span>}
                                                {errors.email?.type === 'pattern' && <span className="text-danger">Email inválido</span>}
                                            </FloatingLabel>
                                        </Row>
                                        <FloatingLabel className="mb-4 floating-distance-2" as={Col} controlId="dni" label="N° de Documento*">
                                            <Form.Control type="text" placeholder="N° de Documento*" name="dni" {...register('dni', {required: true})} value={dni} onChange={(ev) => setDni(ev.target.value)}/>
                                            {errors.dni && <span className="text-danger">Campo requerido</span>}
                                        </FloatingLabel>
                                        {!registroPaciente &&
                                        <Row>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="especialidad" label="Especialidad*">
                                                <Form.Control type="text" placeholder="Especialidad*" name="especialidad" {...register('especialidad', {required: true})} value={especialidad} onChange={(ev) => setEspecialidad(ev.target.value)}/>
                                                {errors.especialidad && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="matricula" label="Matrícula*">
                                                <Form.Control type="text" placeholder="Matrícula*" name="matricula" {...register('matricula', {required: true})} value={matricula}  onChange={(ev) => setMatricula(ev.target.value)}/>
                                                {errors.matricula && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                        </Row>
                                        }
                                        {registroPaciente &&
                                        <Row>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="obraSocial" label="Obra Social">
                                                <Form.Control type="text" placeholder="Obra Social*" name="obraSocial" value={obraSocial} onChange={(ev) => setObraSocial(ev.target.value)}/>
                                                {errors.obraSocial && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                            <FloatingLabel className="mb-4 floating-distance" as={Col} controlId="afiliado" label="N° de afiliado">
                                                <Form.Control type="text" placeholder="N° de afiliado" name="afiliado" value={afiliado}  onChange={(ev) => setAfiliado(ev.target.value)}/>
                                                {errors.afiliado && <span className="text-danger">Campo requerido</span>}
                                            </FloatingLabel>
                                        </Row>
                                        }
                                        <FloatingLabel className="mb-4 floating-distance-2" as={Col} controlId="password" label="Contraseña*">
                                            <Form.Control type="password" placeholder="Contraseña*" name="password" {...register('password', {required: true, minLength: 3})} value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                                            {errors.password?.type === 'required' && <span className="text-danger">Campo obligatorio</span>}
                                            {errors.password?.type === 'minLength' && <span className="text-danger">La contraseña debe tener almenos 3 caracteres</span>}
                                        </FloatingLabel>
                                        <div className="d-flex justify-content-center mb-4">
                                            <Button type="submit" className="btn btn-login">Registrarse</Button>
                                        </div>
                                    </Form>
                                    <p className="text-center pb-4">¿Ya tenés cuenta? <Link to="/login">Iniciá Sesión acá</Link></p>
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