import * as TratamientosService from '../services/tratamientos.service.js'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function VerTratamiento() {
    const { id } = useParams()
    const [tratamientos, setTratamientos] = useState([])
   

    useEffect(() => {
        TratamientosService.traerPorIdPaciente(id)
        .then(resp => {
            setTratamientos(resp)
            
        })
    }, [])
    console.log("-->",tratamientos)

    function test(tests) {
        console.log("click", tests)
    }

    function handleSubmitBorrarTratamiento(ev) {
        ev.preventDefault()
        
        TratamientosService.eliminar(ev.target.idTratamiento.value)
        .then(() => {
            TratamientosService.traerPorIdPaciente(id)
            .then(resp => {
                setTratamientos(resp)
                
            })
            console.log("elimando")
        })
    }

    return (
        <>
            <p>Tratamiento del paciente id - {id}</p>
            {/*tratamientos.map((tratamiento, j) =>
                    <ul key={j}>
                        <li>{tratamiento.tratamiento[0].nombre}</li>
                        <li>{tratamiento.tratamiento[0].horas}</li>
                        <li><Link to={`/`}>Editar id - {tratamiento._id}</Link></li>
                    </ul>
    )*/}
    {tratamientos.map((tratamiento, j) =>
        <div key={j}>
                    <Link to={`/`}>Editar id - {tratamiento._id}</Link> 
                    <form onSubmit={handleSubmitBorrarTratamiento}>
                         <button type="submit" className="fs-5 px-3 btn btn-outline-danger border-0">x</button>
                         <input type="hidden" name="idTratamiento" value={tratamiento._id}/>
                    </form>

                    <p>medicamentos</p>
                    {tratamiento.tratamiento.medicamentos?.map((medicamento, i) => 
                        <div key={i}  className="bg-success">
                            <ul>
                                <li>{medicamento.nombre}</li>
                                <li>{medicamento.horas}</li>
                                <li>{medicamento.fecha}</li>
                                <li> <button onClick={ () => test(medicamento)}>edit</button></li>
                               <li> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{medicamento, idTratamiento: tratamiento._id, idPaciente: id}} className="">ed </Link></li>
                            </ul>
                
                          
                        </div>
                    )}
                    <p>comidas</p>
                     {tratamiento.tratamiento.comidas?.map((comida, k) => 
                        <div key={k}>
                            
                            <p>{comida}  <li> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{comida,idTratamiento: tratamiento._id, idPaciente: id}} className="">editar </Link></li></p>
                    
                        </div>
                    )}
                    <p>ejercicio</p>
                    {   tratamiento.tratamiento.ejercicios?.map((ejercicio, l) => 
                        <div key={l}>
                           
                           <ul>
                            <li>{ejercicio.ejercicio}</li>
                            <li>{ejercicio.repeticiones}</li>
                            <li>{ejercicio.video}</li>
                            <li><Link to={`/editar-tratamiento/${tratamiento._id}`} state={{ejercicio, idTratamiento: tratamiento._id, idPaciente: id}} className="">ed </Link></li>
                           </ul>
                           
                        </div>
                    )}
                   
        </div>
    )}
        </>
    )

}

export default VerTratamiento