import React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import { UsuarioContext } from '../context/UsuarioContext'
import * as ChatService from "../services/chat.service"
import ChatUsuarios from '../components/ChatUsuarios'
import Mensajes from '../components/Mensajes'
import SocketIO from 'socket.io-client'
import UsuariosOnline from '../components/UsuariosOnline'
import * as SeguidoresService from "../services/seguidores.service.js"
import { SocketContext } from '../context/SocketContext'

function Chat() {
    const [chats, setChats] = useState([]) // chats con ._id, array de users(2), chats donde habla el usuario logueado
    const [chatActual, setChatActual] = useState(null) // el chat._id que toca
    const [mensajes, setMensajes] = useState([]) // mensajes segun el chatActual._id
    const [nuevoMensaje, setNuevoMensaje] = useState("")
    const [mensajeEntrante, setMensajeEntrante] = useState(null)
    const [usuariosOnline, setUsuariosOnline] = useState([])

    const scrollRef = useRef()

    let {usuarioLogueado} = useContext(UsuarioContext)
  
    const socket = useContext(SocketContext);
    useEffect(() => {
        /*socket.current = SocketIO('http://localhost:2020', {
            transport: ['websocket']
        })*/
        //console.log("socket",socket)
        socket.on("getMensaje", data => {
            setMensajeEntrante({
                emisor: data.emisorId,
                mensaje: data.mensaje,
                created_at: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        mensajeEntrante && chatActual?.usuarios.includes(mensajeEntrante.emisor) &&
        setMensajes((mensajesPrevios) => [...mensajesPrevios, mensajeEntrante])
    }, [mensajeEntrante, chatActual])

  
    useEffect(() => {
        socket.emit("agregarUsuario", usuarioLogueado._id)
        socket.on("getUsuarios", (usuarios) => {
            //console.log("-->",usuarios)
            setUsuariosOnline(usuarios)
        })
    }, [])
    console.log("online->",usuariosOnline)
    
    useEffect(() => {
        ChatService.traer(usuarioLogueado._id)
        .then( chats => setChats(chats) )
    }, [usuarioLogueado._id])
    console.log("HOLAa",chats)
    useEffect(() => {
        if(chatActual !== null){
            ChatService.traerMensajes(chatActual?._id)
            .then((mensajes) => setMensajes(mensajes))
        }
        
    }, [chatActual])

    useEffect(() => {
        socket.on()
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [mensajes])

    function handleNuevoMensaje(ev) {
        setNuevoMensaje(ev.target.value)
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        const mensaje = {
            emisor: usuarioLogueado._id,
            mensaje: nuevoMensaje,
            chat: chatActual._id
        }
        
        // agarro al id del paciente del chat que seleccionó, como en un chat solo hay 2 usuarios, siempre agarra el id contrario
        const receptorId = chatActual.usuarios.find(usuario => usuario !== usuarioLogueado._id)
        console.log("receptorid",receptorId)

        socket.emit("enviarMensaje", {
            emisorId: usuarioLogueado._id,
            receptorId,
            mensaje: nuevoMensaje
        })

        ChatService.enviarMensaje(mensaje)
        .then( () => {
            ChatService.traerMensajes(chatActual?._id)
            .then((mensajes) => setMensajes(mensajes))
            setNuevoMensaje("")
        } )
    }
    
    //console.log("hola->", usuarioLogueado._id)


  return (

    <section className="container vh-100">
        <div className="row">
            <div className="col-12 col-sm-3 border">
                <p>Chats con pacientes</p>
                {/* <p>chat actual: {chatActual?.usuarios}</p>*/}
                <ul className="list-unstyled">
                  {chats.map( (chat, i) => 
                  <div onClick={ () => setChatActual(chat) } key={chat._id}>
                    <ChatUsuarios  chat={chat} usuarioLogueado={usuarioLogueado}  /> 
                   </div> )
                  }
                </ul>
            </div>
            <div className="col-12 col-sm-6 border">
                {
                    chatActual ? 
                    <>
                
                <div className="box-mensajes p-3">
                    {mensajes.map( (mensaje,i) => 
                    <div ref={scrollRef} key={i} >
                        <Mensajes mensaje={mensaje} own={mensaje.emisor === usuarioLogueado._id} />    
                    </div>         
                    )}
                    
                </div>
                
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea name="mensaje" className="w-100" placeholder="Escribe tu mensaje" value={nuevoMensaje} onChange={handleNuevoMensaje} ></textarea>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
                </> : <span>Elija un chat...</span>
                }
            </div>
            <div className="col-12 col-sm-3">
                <p>Pacientes online</p>
                <ul className="list-unstyled">
                <UsuariosOnline usuariosOnline={usuariosOnline} usuarioLogueadoId={usuarioLogueado._id} setChatActual={setChatActual} setChats={setChats} />
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Chat
