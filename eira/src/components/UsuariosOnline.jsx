import { useState, useEffect} from 'react'
import * as SeguidoresService from "../services/seguidores.service.js"
import * as ChatService from "../services/chat.service"
import IconoUsuarioAzul from '../imgs/icono-usuario-azul.png';

function UsuariosOnline({ usuariosOnline, usuarioLogueadoId, setChatActual, setChats}) {
    const [seguidos, setSeguidos] = useState([])
    const [seguidosOnline, setSeguidosOnline] = useState([])

    useEffect(() => {
        SeguidoresService.traerSeguidores(usuarioLogueadoId)
        .then( (data) => {
            setSeguidos(data)
        })
    }, [usuarioLogueadoId])

    // de los seguidos del usuario, filtro cual está online
    useEffect(() => {
        setSeguidosOnline(seguidos.filter( (seguido) => usuariosOnline.some((u) => u.usuarioId === seguido._id) ))
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
            .then( chats => setChats(chats) )
        })
    }

    return (
        <>
            {seguidosOnline.map( (online,i) =>
                <li className="hover" key={online._id} onClick={() => {handleClick(online)}} >
                    <div className="d-flex align-items-center mb-3">
                    <img src={IconoUsuarioAzul} alt="" className="img-fluid" />
                    <p><i className="bi bi-circle-fill"></i> {online.nombre}</p>
                    </div>
                </li>
            )}
        </>
    )
}

export default UsuariosOnline