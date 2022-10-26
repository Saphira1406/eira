import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import FormMedicamentos from "../components/FormMedicamentos"
import * as TratamientoService from '../services/tratamientos.service'

function EditarTratamiento(props) {
    const location = useLocation()
    const { id } = useParams()
    const [tratamiento, setTratamiento] = useState({})
    const [tratamientoEditado, setTratamientoEditado] = useState({})
   

    const [medicamento, setMedicamento] = useState(location.state.medicamento?.nombre || "")

    const [horas, setHoras] = useState(location.state.medicamento?.horas || "")
    const [fecha, setFecha] = useState(location.state.medicamento?.fecha || "")

    const [comida, setComida] = useState(location.state.comida || "")

    const [ejercicio, setEjercicio] = useState(location.state.ejercicio?.ejercicio || "")
    const [video, setVideo] = useState(location.state.ejercicio?.video || "")
    const [repeticiones, setRepeticiones] = useState(location.state.ejercicio?.repeticiones || "")

    let navigate = useNavigate();

    useEffect(() => {
        TratamientoService.traerPorId(id)
        .then( (resp) => {
            setTratamiento(resp)
           
        } )       
        console.log(location.state.comida)
        
    }, [])

    function handleSubmit(ev) {
        ev.preventDefault()
        const tipo = "medicamentos"
        TratamientoService.editarMedicamento(id,{nombre:medicamento, horas, fecha, id: location.state.medicamento.id}, tipo)
        .then( () => {
            console.log("se ha editado")
            navigate(`/ver-tratamiento/${location.state.idPaciente}`, { replace: true })
        } )


    }

    function handleSubmitComidas(ev) {
        ev.preventDefault()
       
        TratamientoService.editarComida(id, location.state.comida, comida)
        .then(() => {
            navigate(`/ver-tratamiento/${location.state.idPaciente}`, { replace: true })
            console.log("editado comida")
        })
    }

    function handleSubmitEjercicios(ev) {
        ev.preventDefault()
        const tipo = "ejercicios"
        TratamientoService.editarMedicamento(id,{ejercicio, repeticiones, video, id: location.state.ejercicio.id}, tipo)
        .then( () => {
            console.log("se ha editado")
            navigate(`/ver-tratamiento/${location.state.idPaciente}`, { replace: true })
        } )
        console.log("acaa")
    }


   
   useEffect(() => {
   
    console.log(tratamiento.tratamiento?.medicamentos[0])
    console.log(location.state.idPaciente)
   }, [tratamiento])
    return (
        <>

    {location.state.medicamento &&
    
        <form onSubmit={handleSubmit}>
                <input type="hidden" name="id_medico" value="63239b30953ee51e9b52f154" />
                <input type="hidden" name="id_paciente" value={id} />

                <div className="mb-3">
                        <label htmlFor="medicamento" className="form-label">Nombre medicamento</label>
                        <input type="text" className="form-control" id="medicamento" name="medicamento" value={medicamento} onChange={(ev) => setMedicamento(ev.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="horas" className="form-label">Frecuencia horaria</label>
                        <input type="number" className="form-control" id="horas" name="horas" value={horas} onChange={(ev) => setHoras(ev.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="finalizacion" className="form-label">¿Fecha finalizacion?</label>
                        <input type="date" className="form-control" id="finalizacion" name="finalizacion" value={fecha} onChange={ (ev) => setFecha(ev.target.value) } />
                    </div>
              
                <button type="submit" className="btn btn-success">Actualizar medicamento</button>
        </form> 
    }
           
        {location.state.comida && 
            <form onSubmit={handleSubmitComidas}>
                <div className="mb-3">
                    <label htmlFor="comida" className="form-label">Nombre comida a restringir</label>
                    <input type="text" className="form-control" id="comida" name="comida" value={comida} onChange={(ev) => setComida(ev.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Actualizar comida</button>
            </form>
        }
           
            {location.state.ejercicio && 
            <form onSubmit={handleSubmitEjercicios}>
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

                            <button type="submit" className="btn btn-success">Actualizar ejercicio</button>
                    </form>
            }
           
        
    
        
        </>
    )
}


export default EditarTratamiento