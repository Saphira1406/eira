import { Routes, Route, useNavigate } from 'react-router-dom'
import NavbarEira from './components/NavbarEira'
import NavbarEiraLanding from './components/NavbarEiraLanding'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tratamiento from './pages/Tratamiento'
import VerTratamiento from './pages/VerTratamiento'
import EditarTratamiento from './pages/EditarTratamiento'
import MiPerfilProfesional from './pages/MiPerfilProfesional'
import EditarPerfilProfesional from './pages/EditarPerfilProfesional'
import VerHistoriaClinica from './pages/VerHistoriaClinica'
import ListaPacientes from './pages/ListaPacientes'
import MiPerfilPaciente from './pages/pacientes/MiPerfilPaciente'
import EditarPerfilPaciente from './pages/pacientes/EditarPerfilPaciente'
import HistoriaClinicaPaciente from './pages/pacientes/HistoriaClinica'
import FormHistorialClinico from './pages/pacientes/FormHistorialClinico'
import DashboardPaciente from './pages/pacientes/Dashboard'
import Login from './pages/Login'
import UsuarioRegistro from './pages/UsuarioRegistro'
import OlvideContrasena from './pages/OlvideContrasena'
import RecuperarContrasena from './pages/RecuperarContrasena'
import ListadoMedicos from './pages/admin/ListadoMedicos'
import ListadoPacientesAdmin from './pages/admin/ListadoPacientes'
import MensajeFaltaVerificacion from './pages/MensajeFaltaVerificación'
import DashboardMedico from './pages/DashboardMedico'
import DashboardAdmin from './pages/admin/Dashboard'
import { useEffect, useState } from 'react'
import Error404 from './pages/Error404';
import { UsuarioContext } from './context/UsuarioContext'
import { useContext } from 'react'

import * as PacientesService from './services/pacientes.service.js'
import { Toaster, toast } from 'react-hot-toast';
import { SocketContext } from './context/SocketContext'
import Chat from './pages/Chat'


import { getAuth, signInAnonymously } from 'firebase/auth'
import { getToken, onMessage } from 'firebase/messaging'
import { messaging } from './firebase/firebase.js'


function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(JSON.parse(localStorage.getItem('usuario')))
  const [tokenFB, setTokenFB] = useState("")

  let navigate = useNavigate();
  const socket = useContext(SocketContext)

  useEffect(
    () => {
      const token = localStorage.getItem('token')
      if(!token) {
        navigate('/login', { replace: true })
      }
      // eslint-disable-next-line
    }, [])

    console.log(tokenFB)
  function onLogin({usuario, token}) {
      // #####################################
      signInAnonymously(getAuth())
      .then(user => console.log("Auth de firebase",user))
      activarMensajes(usuario)
      //######################################
    localStorage.setItem('usuario', JSON.stringify(usuario))
    setUsuarioLogueado(usuario)
    localStorage.setItem('token', token)

    if(usuario.admin) {
      navigate(`/admin`, { replace: true })
    } else if(!usuario.matricula) {
      navigate(`/paciente`, { replace: true })
    } else {
      navigate(`/medico`, { replace: true })
    }
       
     socket.emit("agregarUsuario", usuario._id) // cuando me logueo, comunico al socket
  }
  console.log(socket)

    const activarMensajes = async (usuario) => {

      const token = await getToken(messaging, { 
        vapidKey: "BPplatmpPbXXLUc_fijIyClE1YncaoMQ8ivkU2zTBG14aqv0DhuI3WoFxPLXG6_kVeEc_yxQMHaX5yr6ElwrCmE"
       })
       .catch( error => console.log("Hubo un error al generar el token.,") )
       
       if(token) {
        console.log("tu token es:", token)
        setTokenFB(token)
        localStorage.setItem('tokenFB', token)
        PacientesService.editar(usuario._id,{nombre: usuario.nombre, apellido: usuario.apellido, telefono: usuario.telefono, email: usuario.email, dni: usuario.dni, "fbNotification": token})
       } else {
        console.log("no tenes token..")
       }
    }

    useEffect( () => {
      onMessage(messaging, message => {
        console.log("tu mensaje", message)
        toast(message.notification.body, {
          icon: '🔔',
        })
      })
    }, [])


  return (
    <UsuarioContext.Provider value={{usuarioLogueado, setUsuarioLogueado}} >
      <SocketContext.Provider value={socket} >
      {!usuarioLogueado && <NavbarEiraLanding />}
      {usuarioLogueado && <NavbarEira />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={onLogin}/>} />
        <Route path='/olvideCntrasena' element={<OlvideContrasena />} />
        <Route path='/recuperarContrasena/:token/:email' element={<RecuperarContrasena />} />
        <Route path='/profesional/pacientes' element={<ListaPacientes activarMensajes={activarMensajes} />} />
        <Route path='/historia-clinica/:id' element={<VerHistoriaClinica />} />
        <Route path='/tratamiento/:id' element={<Tratamiento />} />
        <Route path='/ver-tratamiento/:id' element={<VerTratamiento />} />
        <Route path='/editar-tratamiento/:id' element={<EditarTratamiento />} />
        <Route path='/mi-perfil/:id' element={<MiPerfilProfesional />} />
        <Route path='/editar-perfil/:id' element={<EditarPerfilProfesional />} />
        <Route path='/registro' element={<UsuarioRegistro />} />
        <Route path='/home/perfil-paciente/:id' element={<MiPerfilPaciente />} />
        <Route path='/paciente' element={<DashboardPaciente />} />
        <Route path='/paciente/editar-perfil/:id' element={<EditarPerfilPaciente />} />
        <Route path='/paciente/historia-clinica' element={<HistoriaClinicaPaciente />} />
        <Route path='/paciente/formulario-historia-clinica' element={<FormHistorialClinico />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/admin' element={<DashboardAdmin />} />
        <Route path='/admin/medicos' element={<ListadoMedicos />} />
        <Route path='/admin/Pacientes' element={<ListadoPacientesAdmin />} />
        <Route path='/falta-verificacion' element={<MensajeFaltaVerificacion />} />
        <Route path='/medico' element={<DashboardMedico />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" />
      </SocketContext.Provider>
    </UsuarioContext.Provider>
  );
}

export default App;
