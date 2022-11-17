import { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function FormComida(props) {
    const [comida, setComida] = useState("")
    const [comidas, setComidas] = useState([])

    function agregarComida(ev) {
        console.log("Agregar comi", comida);
        setComidas(prev => [...prev, comida]);
        setComida("");
    }

    useEffect(() => {
        props.guardarComidas(comidas)
    }, [comidas])
    
    return (
        <div>
            <Form.Group className="my-3" controlId="comida">
                <Form.Control type="text" placeholder="Nombre comida a restringir" name="comida" value={comida} onChange={(ev) => setComida(ev.target.value)}/>
            </Form.Group>
            <div className="d-flex justify-content-center">
                <Button type="button" onClick={agregarComida} className="btn btn-agregar">
                    Agregar
                </Button>
            </div>

            <p className="fw-bold text-center mt-4">Lista de comidas restringidas:</p>
            <ul className="lista-agregada d-flex justify-content-center">
                {comidas.map((comida, i) =>
                <li key={i} className="shadow mx-2">
                    {comida}
                </li>
                )}
            </ul>
        </div>
    )
}

export default FormComida