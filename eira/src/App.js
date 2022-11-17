import { Routes, Route, useNavigate } from 'react-router-dom'
import NavbarEira from './components/NavbarEira'
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
import Login from './pages/Login'
import { useState } from 'react'
import { UsuarioContext } from './context/UsuarioContext'
import { useContext } from 'react'


function App() {
  const [usuario, setUsuario] = useState(null)

  let navigate = useNavigate();
  const usuarioContext = useContext(UsuarioContext)

  function onLogin(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario))
    //setUsuario(usuario)
    //localStorage.setItem('token', token)
    if(!usuario.matricula) {
      navigate(`/home/perfil-paciente/${usuario._id}`, { replace: true })
    } else {
      navigate(`/profesional/pacientes`, { replace: true })
    }
    // socket.emit("agregarUsuario", usuario._id) // cuando me logueo, comunico al socket
  }


  return (
    <UsuarioContext.Provider value={usuarioContext} >
      <NavbarEira />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={onLogin}/>} />
        <Route path='/profesional/pacientes' element={<ListaPacientes />} />
        <Route path='/historia-clinica/:id' element={<VerHistoriaClinica />} />
        <Route path='/tratamiento/:id' element={<Tratamiento />} />
        <Route path='/ver-tratamiento/:id' element={<VerTratamiento />} />
        <Route path='/editar-tratamiento/:id' element={<EditarTratamiento />} />
        <Route path='/mi-perfil/:id' element={<MiPerfilProfesional />} />
        <Route path='/editar-perfil/:id' element={<EditarPerfilProfesional />} />
        <Route path='/home/perfil-paciente/:id' element={<MiPerfilPaciente />} /> 
        <Route path='/paciente/editar-perfil/:id' element={<EditarPerfilPaciente />} />
        <Route path='/paciente/historia-clinica' element={<HistoriaClinicaPaciente />} />
        <Route path='/paciente/formulario-historia-clinica' element={<FormHistorialClinico />} />
      </Routes>
      <Footer />
      </UsuarioContext.Provider>
  );
}

export default App;
