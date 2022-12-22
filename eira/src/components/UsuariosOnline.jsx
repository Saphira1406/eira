import { useState, useEffect} from 'react'
import * as SeguidoresService from "../services/conexiones.service.js"
import * as ChatService from "../services/chat.service"
import IconoUsuarioAzul from '../imgs/icono-usuario-azul.png';

function UsuariosOnline({ usuariosOnline, usuarioLogueadoId, setChatActual, setChats, chats}) {
    const [seguidos, setSeguidos] = useState([])
    const [seguidosOnline, setSeguidosOnline] = useState([])

    useEffect(() => {
        SeguidoresService.traerSeguidores(usuarioLogueadoId)
        .then( (data) => {
            setSeguidos(data)
        })
    }, [usuarioLogueadoId])
    console.log("chats", seguidos)

    // de los seguidos del usuario, filtro cual está online
   useEffect(() => {
        setSeguidosOnline(seguidos.filter( (seguido) => usuariosOnline.some((u) => u.usuarioId === seguido.medico) )) // aca debo cambiar por .medico para cuando sea paceinte el q pregunta (Usuario online)
    }, [seguidos, usuariosOnline])

    // Cuando hago click en el usuario Online, me setea el chatActual(que lo traigo por traerUno())
    async function handleClick(usuario) {
        console.log("emisor", usuarioLogueadoId)
        console.log("receptor", usuario._id)
        ChatService.traerUno(usuarioLogueadoId, usuario._id)
        .then(async (chat) => {
            if(!chat){
                const usuarios = {
                    emisor: usuarioLogueadoId,
                    receptor: usuario._id
                }
                const chatNuevo = await ChatService.crear(usuarios)
                console.log("chatNuevo",chatNuevo)
            } else {
                setChatActual(chat)
            }
            console.log("TOQUE",chat)
            // actualizo los chats
            ChatService.traer(usuarioLogueadoId)
            .then(chats => setChats(chats) )
        })
    }

    return (
        <>
            {seguidosOnline.map( (online,i) =>
                <li className="hover" key={online._id} onClick={() => {handleClick(online)}} >
                    <div className="d-flex align-items-center mb-3">
                    <img src={IconoUsuarioAzul} alt="" className="img-fluid me-1"/>
                    <p className='mb-0'><i className="bi bi-circle-fill"></i> {online.nombre}</p>
                    </div>
                </li>
            )}
        </>
    )
}

export default UsuariosOnline
