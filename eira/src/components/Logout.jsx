import {useContext} from "react";
import { useNavigate } from 'react-router-dom'
//import { SocketContext } from '../context/SocketContext'

function Logout() {
    let navigate = useNavigate();
    //const usuario = JSON.parse(localStorage.getItem('usuario'))
   // const socket = useContext(SocketContext);

    function handleSubmit(e) {
        e.preventDefault()
        localStorage.removeItem('usuario')
        //localStorage.removeItem('token')
        //socket.emit("logout", socket.id) // cuando me deslogueo, que me saque del array usuarios
        navigate('/login', { replace: true })
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" className="dropdown-item">Cerrar Sesión</button>
        </form>
    )
}

export default Logout