import { useEffect, useState } from "react"
import ObjectId from "bson-objectid"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import * as apiMedicamentos from '../services/apiMedicamentos.service.js'

function FormMedicamentos(props) {
    const [medicamento, setMedicamento] = useState("")
    const [busqueda, setBusqueda] = useState("")
    const [medicamentos, setMedicamentos] = useState([])
    const [horas, setHoras] = useState("")
    const [fecha, setFecha] = useState("")
    const [listaMedicamentos, setListaMedicamentos] = useState([])

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
        setFecha("")
        setBusqueda("")
        
    }

    useEffect(() => {
        props.guardarMedicamentos(medicamentos)
    }, [medicamentos])

    useEffect(() => {
        apiMedicamentos.traer(busqueda)
        .then((data) => setListaMedicamentos(data.resultados))
    }, [busqueda])



   //console.log(listaMedicamentos)
   console.log(medicamento)

    return(
        <div className="mt-3">

            <div className="mb-4">
                <Select 
                    defaultValue={ {label:"Nombre medicamento", value:""} }
                   
                    options={ listaMedicamentos.map(medi => ({ label: medi.nombre, value: medi.nombre}))}
                    onChange={(ev) => ev ? setMedicamento(ev.value):""}
                    onInputChange={(ev) => setBusqueda(ev)}
                    noOptionsMessage={() => "No se encuentra el medicamento que busca..."}
                    isSearchable
                  
                />
            </div>
           

            <FloatingLabel className="mb-4" controlId="horas" label="¿Cáda cuánto tiempo debe tomar el medicamento? (Indicar en cant. de horas)">
                <Form.Control type="number" name="horas" placeholder="¿Cáda cuánto tiempo debe tomar el medicamento? (Indicar en cant. de horas)" value={horas} onChange={(ev) => setHoras(ev.target.value)}/>
            </FloatingLabel>
            <FloatingLabel className="mb-4" controlId="finalizacion" label="Fecha en que finaliza la toma de medicamentos">
                <Form.Control type="date" placeholder="Fecha en que finaliza la toma de medicamentos" name="finalizacion" value={fecha} onChange={ (ev) => setFecha(ev.target.value)}/>
            </FloatingLabel>
            <div className="d-flex justify-content-center">
                <Button type="button" onClick={agregarMedicamento} className="btn btn-agregar">
                    Agregar
                </Button>
            </div>


            <p className="fw-bold text-center mt-4">Lista de medicamentos agregados:</p>
            <ul className="lista-agregada-meds">
                {medicamentos.map((medicamento, i) =>
                <li key={i} className="shadow mb-3">
                    <span className="fw-bold">{medicamento.nombre}</span><br/>
                    <span className="me-5">
                        <span className="fw-bold">Debe tomar el medicamento cada:</span> {medicamento.horas} hs
                    </span>
                    <span>
                        <span className="fw-bold">Finaliza el:</span> {medicamento.fecha}
                    </span>
                </li>
                )}
            </ul>
        </div>
    )
}

export default FormMedicamentos