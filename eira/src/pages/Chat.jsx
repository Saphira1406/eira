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
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'

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
            setUsuariosOnline(usuarios)
        })
    }, [])

    useEffect(() => {
        ChatService.traer(usuarioLogueado._id)
        .then(chats => setChats(chats) )
    }, [usuarioLogueado._id])

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
        })
    }

    return (
        <main className='py-5 fondo-generico'>
            <section>
                <Container className='bg-white shadow rounded'>
                    <Row>
                        <h1 className='visually-hidden'>Chats</h1>
                        <Col md={3} className="border py-3 ps-3">
                            <p>Chats</p>
                            {/* <p>chat actual: {chatActual?.usuarios}</p>*/}
                            <ul className="list-unstyled">
                                {chats.map( (chat, i) =>
                                <div onClick={ () => setChatActual(chat) } key={chat._id}>
                                    <ChatUsuarios  chat={chat} usuarioLogueado={usuarioLogueado}  />
                                </div> )
                                }
                            </ul>
                        </Col>

                        <Col md={6} className="border py-3">
                            {
                                chatActual ?
                                <>
                                    <div className="box-mensajes p-3">
                                        {mensajes.map( (mensaje,i) =>
                                        <div ref={scrollRef} key={i}>
                                            <Mensajes mensaje={mensaje} own={mensaje.emisor === usuarioLogueado._id} />
                                        </div>
                                        )}
                                    </div>

                                    <Form onSubmit={handleSubmit} className="mt-5">
                                        <div className='d-flex align-items-stretch my-3'>
                                            <FloatingLabel className="w-100" controlId="mensaje" label="Mensaje">
                                                <Form.Control as="textarea" rows={2} name="mensaje" placeholder="Mensaje" value={nuevoMensaje} onChange={handleNuevoMensaje}/>
                                            </FloatingLabel>
                                            <Button type="submit" className='btn-mensaje-chat'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                                </svg>
                                            </Button>
                                        </div>
                                    </Form>
                                </> : <span>Elija un chat...</span>
                            }
                        </Col>

                        <Col md={3} className="border py-3 pe-3">
                        <p>Online</p>
                            <ul className="list-unstyled">
                                <UsuariosOnline usuariosOnline={usuariosOnline} usuarioLogueadoId={usuarioLogueado._id} setChatActual={setChatActual} setChats={setChats} />
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Chat
