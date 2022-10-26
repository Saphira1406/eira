import { useState, useEffect } from 'react'
import * as PacientesService from '../services/pacientes.service.js'
import { Link } from 'react-router-dom'

function ListadoPacientes() {
    const [pacientes, setPacientes] = useState([])

    useEffect(() => {
        PacientesService.traer()
        .then((pacientes) => {
            setPacientes(pacientes)
        })
       
    }, [])

    return (
        <>
        <ul>
            {pacientes.map((paciente, i) => 
                <li key={i}>{paciente.nombre} (<Link to={`/tratamiento/${paciente._id}`} className="">Crear tratamiento </Link>) (<Link to={`/ver-tratamiento/${paciente._id}`} className="">ver tratamiento </Link>)</li>
            )}
        </ul>
        
        </>
    )
}

export default ListadoPacientes