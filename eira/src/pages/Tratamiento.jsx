import { Link, useParams } from 'react-router-dom'


function Tratamiento() {
    const { id } = useParams()

    return (
        <>
        <p>¿Que tratamiento crear?</p>
        <ul>
            <li> <Link to={`/comidas/${id}`} className="">Comidas</Link></li>
            <li> <Link to={`/ejercicios/${id}`} className="">Ejercicios</Link></li>
            <li> <Link to={`/medicamentos/${id}`} className="">Medicamentos</Link></li>
        </ul>
        </>
    )

}

export default Tratamiento