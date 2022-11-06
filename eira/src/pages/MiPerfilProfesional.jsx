import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as ProfesionalService from "../services/profesionales.service.js"

function MiPerfilProfesional () {
    const [profesional, setProfesional] = useState({})
    const { id } = useParams()

    useEffect(() => {
        ProfesionalService.traerPorId(id)
        .then( resp => setProfesional(resp) )
    }, [])

    function handleSubmit(ev) {
        ev.preventDefault()
        if(window.confirm("¿Eliminar tratamiento?")) {
            ProfesionalService.eliminar(id)
            .then(() => alert("Profesional eliminado"))
        }
    }


    return( 
        
        <div className="d-flex justify-content-center align-items-center">
            <div className="">
                <p>Mi perfil</p>
                <p>Profesional: {profesional.nombre} {profesional.apellido}</p>
                <p>Especialidad: {profesional.especialidad}</p>
                <p>Matricula: {profesional.matricula}</p>
                <p>Telefono: {profesional.telefono}</p>

                <Link to={`/editar-perfil/${id}`} state={{profesional}}> Editar perfil</Link>

                <form onSubmit={handleSubmit}>
                    
                    <button type="submit" className="btn btn-danger">Eliminar perfil</button>
                </form>
            </div>
        </div>
        
     )
}

export default MiPerfilProfesional