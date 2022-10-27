import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as ProfesionalService from "../services/profesionales.service.js"

function EditarPerfilProfesional() {
    const location = useLocation()
    // const [profesional, setProfesional] = useState({}) porque no lee  en vez de location.state
    const [nombre, setNombre] = useState(location.state.profesional?.nombre || "")
    const [apellido, setApellido] = useState(location.state.profesional?.apellido || "")
    const [telefono, setTelefono] = useState(location.state.profesional?.telefono || "")
    const [especialidad, setEspecialidad] = useState(location.state.profesional?.especialidad || "")
    const [email, setEmail] = useState(location.state.profesional?.email || "")
    const [dni, setDni] = useState(location.state.profesional?.dni || "")
    const [matricula, setMatricula] = useState(location.state.profesional?.matricula || "")
   
    const { id } = useParams()
    let navigate = useNavigate();

    useEffect(() => {
        /*ProfesionalService.traerPorId(id)
        .then( resp => setProfesional(resp) )
        console.log(location.state.profesional)*/
    }, [])

    function handleSubmit(ev) {
        ev.preventDefault()
        console.log("aca")
        ProfesionalService.editar(id, {nombre, apellido, telefono, especialidad, email, dni, matricula})
        .then( () =>  navigate(`/mi-perfil/${id}`, { replace: true }) )
    }
    

    return (
        <>
            <p>Edición de perfil</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={nombre} onChange={(ev) => setNombre(ev.target.value)}/>
                </div>

                <div className="mb-3">
                            <label htmlFor="medicamento" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="medicamento" name="medicamento" value={apellido} onChange={(ev) => setApellido(ev.target.value)}/>
                </div>

                <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Teléfono</label>
                            <input type="text" className="form-control" id="telefono" name="telefono" value={telefono} onChange={(ev) => setTelefono(ev.target.value)}/>
                </div>

                <div className="mb-3">
                            <label htmlFor="especialidad" className="form-label">Especialidad</label>
                            <input type="text" className="form-control" id="especialidad" name="especialidad" value={especialidad} onChange={(ev) => setEspecialidad(ev.target.value)}/>
                </div>

                <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="especialidad" name="email" value={email} onChange={(ev) => setEmail(ev.target.value)} disabled />
                </div>

                <div className="mb-3">
                            <label htmlFor="dni" className="form-label">Dni</label>
                            <input type="text" className="form-control" id="dni" name="dni" value={dni} onChange={(ev) => setDni(ev.target.value)} disabled/>
                </div>

                <div className="mb-3">
                            <label htmlFor="matricula" className="form-label">Matrícula</label>
                            <input type="text" className="form-control" id="matricula" name="matricula" value={matricula} onChange={(ev) => setMatricula(ev.target.value)} disabled/>
                </div>

                <button type="submit" className="btn btn-success">Actualizar mi perfil</button>

            </form>
        </>
    )
}

export default EditarPerfilProfesional