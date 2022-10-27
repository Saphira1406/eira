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


    return( 
        
        <div className="d-flex justify-content-center align-items-center">
            <div className="">
            
                <p>Mi perfil</p>
                <p>Profesional: {profesional.nombre} {profesional.apellido}</p>
                <p>Especialidad: {profesional.especialidad}</p>
                <p>Matricula: {profesional.matricula}</p>
                <p>Telefono: {profesional.telefono}</p>

                <Link to={`/editar-perfil/${id}`} state={{profesional}}> Editar perfil</Link>
            </div>
        </div>
        
     )
}

export default MiPerfilProfesional