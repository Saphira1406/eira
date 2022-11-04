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
        
        if(window.confirm("¿Eliminar tratamiento?")) {
             TratamientosService.eliminar(ev.target.idTratamiento.value)
             .then(() => {
             TratamientosService.traerPorIdPaciente(id)
            .then(resp => {
                setTratamientos(resp)  
            })
           
        })
        }        
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

                    <p className="bg-success">Medicamentos</p>
                    {tratamiento.tratamiento.medicamentos?.map((medicamento, i) => 
                        <div key={i}>
                            <ul>
                                <li>{medicamento.nombre}</li>
                                <li>{medicamento.horas}</li>
                                <li>{medicamento.fecha}</li>
                            {/*    <li> <button onClick={ () => test(medicamento)}>edit</button></li>*/}
                               <li> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{medicamento, idTratamiento: tratamiento._id, idPaciente: id}} className="">Editar </Link></li>
                            </ul>
                
                          
                        </div>
                    )}
                    <p className="bg-success">Comidas</p>
                     {tratamiento.tratamiento.comidas?.map((comida, k) => 
                        <div key={k}>
                            
                            <p>{comida}  <li> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{comida,idTratamiento: tratamiento._id, idPaciente: id}} className="">editar </Link></li></p>
                    
                        </div>
                    )}
                    <p className="bg-success">Ejercicio</p>
                    {   tratamiento.tratamiento.ejercicios?.map((ejercicio, l) => 
                        <div key={l}>
                           
                           <ul>
                            <li>{ejercicio.ejercicio}</li>
                            <li>{ejercicio.repeticiones}</li>
                            <li>{ejercicio.video}</li>
                            <li><Link to={`/editar-tratamiento/${tratamiento._id}`} state={{ejercicio, idTratamiento: tratamiento._id, idPaciente: id}} className="">editar </Link></li>
                           </ul>
                           
                        </div>
                    )}
                   
        </div>
    )}
        </>
    )

}

export default VerTratamiento