import { useEffect, useState } from "react"
import ObjectId from "bson-objectid"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';


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
        setFecha("")
    }

    useEffect(() => {
        props.guardarMedicamentos(medicamentos)
    }, [medicamentos])

    return(
        <div className="mt-3">
            <FloatingLabel className="mb-4" controlId="medicamento" label="Nombre del medicamento">
                <Form.Control type="text" name="medicamento" placeholder="Nombre del medicamento" value={medicamento} onChange={(ev) => setMedicamento(ev.target.value)}/>
            </FloatingLabel>
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