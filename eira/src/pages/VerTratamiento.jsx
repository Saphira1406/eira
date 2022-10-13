import * as TratamientosService from '../services/tratamientos.service.js'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function VerTratamiento() {
    const { id } = useParams()
    const [tratamientos, setTratamientos] = useState([])

    useEffect(() => {
        TratamientosService.traerPorId(id)
        .then((resp) => {
            setTratamientos(resp)
            
        })
    }, [])
    console.log(tratamientos)
    return (
        <>
            <p>Tratamiento del paciente id - {id}</p>
            {tratamientos.map((tratamiento, i) => 
                <ul key={i}>
                </ul>
            )}

        
        </>
    )

}

export default VerTratamiento