import { useContext, useEffect, useState } from 'react'
import * as ProfesionalesService from '../../services/profesionales.service.js'
import * as UsuarioService from '../../services/usuarios.service.js'
import * as PacientesService from '../../services/pacientes.service.js'
import { UsuarioContext } from '../../context/UsuarioContext.jsx'

function ProfesionalesVinculados(){
    const [profesionales, setProfesionales] = useState([])
    const [paciente, setPaciente] = useState({})

    const {usuarioLogueado} = useContext(UsuarioContext)


    useEffect(() => {
        ProfesionalesService.traer()
        .then(resp => setProfesionales(resp))

        PacientesService.traerPorId(usuarioLogueado._id)
        .then(resp => setPaciente(resp))
        
    }, [])
    console.log(profesionales)

    function agregarProfesional(idProfesional) {
        console.log("agrego profesional", idProfesional)
        UsuarioService.agregarProfesional(idProfesional, paciente)
        .then(resp => console.log(resp))
    }
    return (
        <>
            <h1>Buscar profesional</h1>
            {profesionales.map((profesional, i) => 
                <div key={i}>
                    <div className="border p-2">
                        <p>{profesional.nombre} {profesional.apellido}</p>
                        <button className="btn btn-dark" onClick={() => agregarProfesional(profesional._id)}>Agregar profesional</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfesionalesVinculados