import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as PacientesService from '../services/pacientes.service.js'
import ListadoPacientes from '../components/ListadoPacientes'

function Home() {
    const [pacientes, setPacientes] = useState([])

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
       
        
        </>
    )
}

export default Home