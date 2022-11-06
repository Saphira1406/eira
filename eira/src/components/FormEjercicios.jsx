import { useEffect, useState } from "react"
import ObjectId from "bson-objectid"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
                }
            ]);
        setEjercicio("");
        setVideo("");
        setRepeticiones("");
    }

    useEffect(() => {
        props.guardarEjercicios(ejercicios)
    }, [ejercicios])

    return(
        <div className="mt-3">
            <Form.Group className="mb-4" controlId="ejercicio">
                <Form.Control type="text" placeholder="Nombre del ejercicio" name="ejercicio" value={ejercicio} onChange={(ev) => setEjercicio(ev.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-4" controlId="repeticiones">
                <Form.Control type="text" placeholder="Indicar cantidad de repeticiones" name="repeticiones" value={repeticiones} onChange={e => setRepeticiones(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-4" controlId="video">
                <Form.Control type="text" placeholder="URL de video" name="video" value={video} onChange={e => setVideo(e.target.value)}/>
            </Form.Group>
            <div className="d-flex justify-content-center">
                <Button type="button" onClick={agregarEjercicio} className="btn btn-agregar">
                    Agregar
                </Button>
            </div>
            <p className="fw-bold text-center mt-4">Lista de ejercicios agregados:</p>
            <ul className="lista-agregada-meds">
                {ejercicios.map((ejercicio, i) =>
                <li key={i} className="shadow mb-3">
                    <span className="fw-bold">{ejercicio.ejercicio}</span><br/>
                    <span className="me-5">
                        <span className="fw-bold">Cantidad de repeticiones:</span> {ejercicio.repeticiones}
                    </span>
                    <span className="me-5">
                        <span className="fw-bold">Video:</span> {ejercicio.video}
                    </span>
                </li>
                )}
            </ul>
        </div>
    )
}

export default FormEjercicios