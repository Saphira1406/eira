import { useEffect, useState } from "react"


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
        <>
        
                 <div className="mb-3">
                    <label htmlFor="comida" className="form-label">Nombre comida a restringir</label>
                    <input type="text" className="form-control" id="comida" name="comida" value={comida} onChange={(ev) => setComida(ev.target.value)} />
                    <button type="button" className="btn btn-success mt-3" onClick={agregarComida}>agregar</button>
                </div>
               

                <p>Lista de comidas agregadas</p>
                <ul>
                    {comidas.map((comida, i) => 
                    
                    <li key={i}>
                        {comida}
                    </li>
                    )}
                </ul>
                --------------------------------------------------------
                
        </>
    )
}

export default FormComida