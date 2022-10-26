import { useEffect, useState } from "react"
import ObjectId from "bson-objectid"


function FormEjercicios(props) {

    const [ejercicio, setEjercicio] = useState("")
    const [video, setVideo] = useState("")
    const [ejercicios, setEjercicios] = useState([])
    const [repeticiones, setRepeticiones] = useState("")

    function agregarEjercicio(ev) {
    
       setEjercicios(prev => 
        [
            ...prev, 
            {
                id: ObjectId(),
                ejercicio,
                video,
                repeticiones
            }]);
        
       
       setEjercicio("");
       setVideo("");
       setRepeticiones("");
    }

    useEffect(() => {
        props.guardarEjercicios(ejercicios)
    }, [ejercicios])

    return(
        <>
            <div className="mb-3">
                    <label htmlFor="ejercicio" className="form-label">Nombre ejercicio</label>
                    <input type="text" className="form-control" id="ejercicio" name="ejercicio" value={ejercicio} onChange={(ev) => setEjercicio(ev.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="repeticiones" className="form-label">Repeticiones</label>
                    <input type="number" className="form-control" id="repeticiones" name="repeticiones" value={repeticiones} onChange={e => setRepeticiones(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="video" className="form-label">Video</label>
                    <input type="text" className="form-control" id="video" name="video" value={video} onChange={e => setVideo(e.target.value)} />
                </div>


                <button type="button" className="btn btn-success" onClick={agregarEjercicio}>agregar</button>

                <p>Lista de ejercicio agregadas</p>
                {ejercicios.map((ejercicio, i) =>
                    <ul key={i}>
                      
                        <li>{ejercicio.ejercicio}</li>
                        <li>{ejercicio.repeticiones}</li>
                        <li><a href={ejercicio.video} target="_blank" rel="noreferrer">ver video</a></li>
                    </ul>
                )}
        </>
    )
}

export default FormEjercicios