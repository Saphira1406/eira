import { useEffect, useState } from "react"
import ObjectId from "bson-objectid"


function FormMedicamentos(props) {
    
    const [medicamento, setMedicamento] = useState("")
    const [medicamentos, setMedicamentos] = useState([])
    const [horas, setHoras] = useState("")
    const [fecha, setFecha] = useState("")


    function agregarMedicamento() {
        console.log("agrego a lista de medicamentos")
       
        setMedicamentos( prev =>
                [
                    ...prev,
                    {
                        id: ObjectId(),
                        nombre: medicamento,
                        horas,
                        fecha
                    }
                ]
        )
       
        setMedicamento("")
        setHoras("")
        
    }

    useEffect(() => {
        props.guardarMedicamentos(medicamentos)
    }, [medicamentos])

    return(
        <div>
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

                    <button type="button" className="btn btn-success mt-3" onClick={agregarMedicamento}>agregar med</button>

                    <p>Lista de medicamentos agregadas</p>
                   
                    <ul>
                        {medicamentos.map((medicamento, i) => 
                        
                        <li key={i}>
                            {medicamento.nombre}<br/>
                            {medicamento.horas}
                            {medicamento.fecha}
                        </li>
                        )}
                
                        
                    </ul>
                    --------------------------------------------
        
        </div>
    )
}

export default FormMedicamentos