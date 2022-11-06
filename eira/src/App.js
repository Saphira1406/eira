import { Routes, Route, useNavigate } from 'react-router-dom'
import NavbarEira from './components/NavbarEira'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tratamiento from './pages/Tratamiento'
import VerTratamiento from './pages/VerTratamiento'
import EditarTratamiento from './pages/EditarTratamiento'
import MiPerfilProfesional from './pages/MiPerfilProfesional'
import EditarPerfilProfesional from './pages/EditarPerfilProfesional'



function App() {
  return (
    <div>
      <NavbarEira />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tratamiento/:id' element={<Tratamiento />} />
        <Route path='/ver-tratamiento/:id' element={<VerTratamiento />} />
        <Route path='/editar-tratamiento/:id' element={<EditarTratamiento />} />
        <Route path='/mi-perfil/:id' element={<MiPerfilProfesional />} />
        <Route path='/editar-perfil/:id' element={<EditarPerfilProfesional />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
