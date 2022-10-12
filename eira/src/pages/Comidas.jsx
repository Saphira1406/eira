import { useState } from 'react'
import * as TratamientoService from '../services/tratamientos.service.js'

function Comidas() {
    const [comida, setComida] = useState("")
    const [comidas, setComidas] = useState([])
    const [formTratamiento, setFormTratamiento] = useState({})

    /** boton subir form */
    function handleSubmit(ev) {
        
        ev.preventDefault()
       const id_medico = ev.target.id_medico.value
       const id_paciente = ev.target.id_paciente.value
        setFormTratamiento({
            
            comidas,
        })
        TratamientoService.crear({tratamiento: {comidas}, id_medico, id_paciente})
        .then(resp => {
            alert(resp);
        })
        console.log("--->",formTratamiento)
        setComidas([])

    }

    /** boton agregar al array */
    function agregarComida(ev) {
        console.log("Agregar comi", comida);
       
       // console.log("Array comi", comidas);
        setComidas(prev => [...prev, comida]);
        
        
        setComida("");
    }

    /** boton cambios input */
    function onChangeComida(ev) {
        setComida(ev.target.value);
        
    }

    return (
        <>
            <div> Formulario de comidas</div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="comida" className="form-label">Nombre comida a restringir</label>
                    <input type="text" className="form-control" id="comida" name="comida" value={comida} onChange={onChangeComida} />
                    <button type="button" onClick={agregarComida}>agregar</button>
                </div>
                <input type="hidden" name="id_medico" value="63239b30953ee51e9b52f154" />
                <input type="hidden" name="id_paciente" value="63239baf953ee51e9b52f157" />

                <p>Lista de comidas agregadas</p>
                <ul>
                    {comidas.map((comida, i) => 
                    
                    <li key={i}>
                        {comida}
                    </li>
                    )}
                </ul>
                

                <button type="submit" className="btn btn-form w-100">Guardar</button>
            </form>
        
        </>
    )
}

export default Comidas