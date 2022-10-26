import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Tratamiento from './pages/Tratamiento'
import VerTratamiento from './pages/VerTratamiento'
import EditarTratamiento from './pages/EditarTratamiento'



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tratamiento/:id' element={<Tratamiento />} />
      <Route path='/ver-tratamiento/:id' element={<VerTratamiento />} />
      <Route path='/editar-tratamiento/:id' element={<EditarTratamiento />} />
    

    </Routes>
  );
}

export default App;
