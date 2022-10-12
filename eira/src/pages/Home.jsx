import { Link } from 'react-router-dom'

function Home() {

    return (
        <>
        <p>¿Que tratamiento crear?</p>
        <ul>
            <li> <Link to={'/comidas'} className="">Comidas</Link></li>
            <li> <Link to={'/ejercicios'} className="">Ejercicios</Link></li>
            <li> <Link to={'/medicamentos'} className="">Medicamentos</Link></li>
        </ul>
       
       
       
     
          <form >
            <div className="mb-3">
                <div className="form-group">
                    <label htmlFor="tipo"></label>
                    <select className="form-control" name="tipo" id="">
                    <option>Medicamentos</option>
                    <option>Ejercicio</option>
                    <option>Comidas</option>
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <input type="hidden" name="id_prof" value="" />
                <input type="hidden" name="id_paciente" value="" />
            </div>
            <div className="mb-3">
                <label htmlFor="medicamento" className="form-label">Nombre medicamento</label>
                <input type="text" className="form-control" id="medicamento" name="medicamento"  />
            </div>
            
            <div className="mb-3">
                <label htmlFor="frecuencia" className="form-label">Frecuencia</label>
                <input type="number" className="form-control" id="frecuencia" name="frecuencia"  />
            </div>

            <button type="submit" className="btn btn-form w-100">Siguiente</button>
                            
        </form>
        </>
    )
}

export default Home