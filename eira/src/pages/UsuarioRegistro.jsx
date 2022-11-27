import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import * as UsuariosService from '../services/auth.service.js'

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
        <section className="container py-3">
               <div className="row justify-content-center align-items-center m-3 m-lg-0">
            <div className="col-12 text-center">
               
            </div>
                <div className="col-12 col-lg-6 card rounded-3 card-login ">
                <div className="w-100 px-lg-5 py-lg-4 p-4">
                    <h1 className="font-weight-bold mb-4 text-center">Registrarse</h1>
                    <div className="text-center">
                        <button className={`btn m-3 border ${registroPaciente ? "btn-success": ""}`} onClick={(ev) => setRegistroPaciente(true)}>Soy paciente</button>
                        <button className={`btn border ${!registroPaciente ? "btn-success": ""}`} onClick={(ev) => setRegistroPaciente(false)}>Soy profesional de la salud</button>
                    </div>
                    <p>(*) Campos obligatorios</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre*</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    id="nombre" 
                                    name="nombre" {...register('nombre', {required: true})} 
                                    value={nombre} 
                                    onChange={(ev) => setNombre(ev.target.value)} />
                                    {errors.nombre && <span className="text-danger">Campo requerido</span>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">Apellido*</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="apellido" 
                                    name="apellido" 
                                    value={apellido} {...register('apellido', {required: true})} 
                                    onChange={(ev) => setApellido(ev.target.value)} />
                                    {errors.dni && <span className="text-danger">Campo requerido</span>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="dni" className="form-label">Dni*</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="dni" 
                                    name="dni" 
                                    value={dni} {...register('dni', {required: true})} 
                                    onChange={(ev) => setDni(ev.target.value)} />
                                    {errors.dni && <span className="text-danger">Campo requerido</span>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="telefono" 
                                    name="telefono" 
                                    value={telefono} 
                                    onChange={(ev) => setTelefono(ev.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email*</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    name="email" {...register('email', { required:true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ })} 
                                    value={email} 
                                    onChange={(ev) => setEmail(ev.target.value)} />
                                    {errors.email?.type === 'required' && <span className="text-danger">Campo obligatorio</span>}
                                    {errors.email?.type === 'pattern' && <span className="text-danger">email invalido</span>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password* (min 3 caracteres)</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    name="password" {...register('password', {required: true, minLength: 3})} 
                                    value={password}
                                    onChange={(ev) => setPassword(ev.target.value)} />
                                    {errors.password?.type === 'required' && <span className="text-danger">Campo obligatorio</span>}
                                    {errors.password?.type === 'minLength' && <span className="text-danger">La contraseña debe tener almenos 3 caracteres</span>}
                            </div>

                            {!registroPaciente && 
                                <>
                            <div className="mb-3">
                                <label htmlFor="matricula" className="form-label">Matrícula*</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="matricula" 
                                    name="matricula" {...register('matricula', {required: true})} 
                                    value={matricula} 
                                    onChange={(ev) => setMatricula(ev.target.value)} />
                                    {errors.matricula && <span className="text-danger">Campo requerido</span>}
                             </div>

                            <div className="mb-3">
                                <label htmlFor="especialidad" className="form-label">Especialidad*</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="especialidad" 
                                    name="especialidad" {...register('especialidad', {required: true})} 
                                    value={especialidad} 
                                    onChange={(ev) => setEspecialidad(ev.target.value)} />
                                    {errors.especialidad && <span className="text-danger">Campo requerido</span>}
                            </div>
                                </>
                            }

                            

                        

                            <button type="submit" className="btn btn-form w-100">Registrarse</button>
                    </form>
                    <div className="col-12 mt-5 justify-content-center">
                        <p>¿Ya tenés cuenta? <Link to="/login">Logueate</Link></p>
                    </div>

                    </div>
                        {error && <p>{error}</p>}
                </div>
            </div> 
        </section>
    )
}

export default UsuarioRegistro