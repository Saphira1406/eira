import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as PacientesService from '../services/pacientes.service.js'
import ListadoPacientes from '../components/ListadoPacientes'

function Home() {
    const [pacientes, setPacientes] = useState([])
    const [idProfesional, setIdProfesional] = useState("63239b30953ee51e9b52f154")

    useEffect(() => {
        PacientesService.traer()
        .then( resp => {
            setPacientes(resp)
            console.log(resp)
        } )
    }, [])    

    return (
        <>
       
        <ListadoPacientes/>

        <Link to={`/mi-perfil/${idProfesional}`}>Mi perfil profesional</Link>
       
        
        </>
    )
}

export default Home