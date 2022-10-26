import { useEffect, useState } from 'react'
import * as TratamientoService from '../services/tratamientos.service.js'
import { useNavigate, useParams } from 'react-router-dom'
import FormComida from '../components/FormComida'
import FormMedicamentos from '../components/FormMedicamentos'
import FormEjercicios from '../components/FormEjercicios'

function Tratamiento() {
    //const [comida, setComida] = useState("")
    const [comidas, setComidas] = useState([])

   // const [medicamento, setMedicamento] = useState("")
    const [medicamentos, setMedicamentos] = useState([])
   /* const [horas, setHoras] = useState("")
    const [fecha, setFecha] = useState("")*/

  /*  const [ejercicio, setEjercicio] = useState("")
    const [video, setVideo] = useState("")*/
    const [ejercicios, setEjercicios] = useState([])
   // const [repeticiones, setRepeticiones] = useState("")

    const { id } = useParams()
    let navigate = useNavigate();

    /** boton subir form */
    function handleSubmit(ev) {
        
        ev.preventDefault()
       const id_medico = ev.target.id_medico.value
       const id_paciente = ev.target.id_paciente.value
    
        TratamientoService.crear({tratamiento: {comidas, medicamentos, ejercicios}, id_medico, id_paciente})
        .then(() => {
            navigate(`/`, { replace: true })
            console.log("??")
        })
      
        setComidas([])
        setMedicamentos([])

    }

    function guardarComidas(listaComidas) {
        console.log("--> Lista",listaComidas)
        setComidas(listaComidas)
    }

    function guardarMedicamentos(listaMedicamentos) {
        console.log("-->lista med", listaMedicamentos)
        setMedicamentos(listaMedicamentos)
    }

    function guardarEjercicios(listaEjercicioos) {
        setEjercicios(listaEjercicioos)
    }

    useEffect(() => {
        console.log(medicamentos)
    }, [medicamentos])

    return (
        <>
            <div> Formulario de comidas</div>

            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id_medico" value="63239b30953ee51e9b52f154" />
                <input type="hidden" name="id_paciente" value={id} />
                
                <FormComida guardarComidas={guardarComidas} />

                <FormMedicamentos guardarMedicamentos={guardarMedicamentos} />

                <FormEjercicios guardarEjercicios={guardarEjercicios} />                

                <button type="submit" className="btn btn-success">Guardar</button>
            </form>
        
        </>
    )
}

export default Tratamiento