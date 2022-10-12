import { useState } from 'react'

function Comidas() {
    const [comida, setComida] = useState("")
    const [comidas, setComidas] = useState([])

    /** boton subir form */
    function handleSubmit(ev) {
        ev.preventDefault()
        console.log(comidas)

    }

    /** boton agregar al array */
    function agregarComida(ev) {
        console.log("Agregar comi", comida);
        console.log("Array comi", comidas);
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