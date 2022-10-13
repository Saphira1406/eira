import { useState } from 'react'
import * as TratamientoService from '../services/tratamientos.service.js'
import { useParams } from 'react-router-dom'

function Ejercicios() {
    const [ejercicio, setEjercicio] = useState("")
    const [video, setVideo] = useState("")
    const [ejercicios, setEjercicios] = useState([])
    const [repeticiones, setRepeticiones] = useState("")
    const [formTratamiento, setFormTratamiento] = useState({})
    const { id } = useParams()

    /** boton subir form */
    function handleSubmit(ev) {
        
        ev.preventDefault()
       const id_medico = ev.target.id_medico.value
       const id_paciente = ev.target.id_paciente.value
        setFormTratamiento({
            ejercicios,
        })
        TratamientoService.crear({tratamiento: {ejercicios}, id_medico, id_paciente})
        .then(resp => {
            alert(resp);
        })
        console.log("--->",ejercicios)
        setEjercicios([])

    }

    /** boton agregar al array */
    function agregarEjercicio(ev) {
        //console.log("Agregar ejercicio/video", ejercicio + video);
       
       // console.log("Array comi", comidas);
       setEjercicios(prev => [...prev, {ejercicio, video, repeticiones}]);
        
       
       setEjercicio("");
       setVideo("");
       setRepeticiones("");
    }

    /** boton cambios input */
    function onChangeEjercicio(ev) {
        setEjercicio(ev.target.value);
        
    }


    return (
        <>
           <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="ejercicio" className="form-label">Nombre ejercicio</label>
                    <input type="text" className="form-control" id="ejercicio" name="ejercicio" value={ejercicio} onChange={onChangeEjercicio} />
                </div>

                <div className="mb-3">
                    <label htmlFor="repeticiones" className="form-label">Repeticiones</label>
                    <input type="number" className="form-control" id="repeticiones" name="repeticiones" value={repeticiones} onChange={e => setRepeticiones(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="video" className="form-label">Video</label>
                    <input type="text" className="form-control" id="video" name="video" value={video} onChange={e => setVideo(e.target.value)} />
                </div>


                <button type="button" onClick={agregarEjercicio}>agregar</button>
                <input type="hidden" name="id_medico" value="63239b30953ee51e9b52f154" />
                <input type="hidden" name="id_paciente" value={id} />

                <p>Lista de ejercicio agregadas</p>
                {ejercicios.map((ejercicio, i) =>
                    <ul key={i}>
                      
                        <li>{ejercicio.ejercicio}</li>
                        <li>{ejercicio.repeticiones}</li>
                        <li><a href={ejercicio.video} target="_blank" rel="noreferrer">ver video</a></li>
                    </ul>
                )}
                <ul>
                 
                </ul>
                

                <button type="submit" className="btn btn-form w-100">Guardar</button>
            </form>
        
        </>
    )
}

export default Ejercicios