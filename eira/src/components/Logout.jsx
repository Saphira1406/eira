import {useContext} from "react";
import { useNavigate } from 'react-router-dom'
import { UsuarioContext } from "../context/UsuarioContext";
import { SocketContext } from '../context/SocketContext'
import * as PacientesService from '../services/pacientes.service.js'

function Logout() {
    let navigate = useNavigate();
    //const usuario = JSON.parse(localStorage.getItem('usuario'))
    const {setUsuarioLogueado, usuarioLogueado} = useContext(UsuarioContext)
    const socket = useContext(SocketContext)
    console.log(usuarioLogueado)

    function handleSubmit(e) {
        e.preventDefault()
        const usuario = {
            nombre: usuarioLogueado.nombre,
            apellido: usuarioLogueado.apellido,
            email: usuarioLogueado.email,
            telefono: usuarioLogueado.telefono,
            dni: usuarioLogueado.dni,
            fbNotification: null
        }
        socket.emit("logout", socket.id) // cuando me deslogueo, que me saque del array usuarios
        PacientesService.editar(usuarioLogueado._id, usuario)
        setUsuarioLogueado(null)
        localStorage.removeItem('usuario')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenFB')
        localStorage.removeItem('misRecordatorios')

        navigate('/login', { replace: true })
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" className="dropdown-item logout">Cerrar Sesión</button>
        </form>
    )
}

export default Logout