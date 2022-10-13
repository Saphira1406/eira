import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Comidas from './pages/Comidas'
import Ejercicios from './pages/Ejercicios'
import Medicamentos from './pages/Medicamentos'
import Tratamiento from './pages/Tratamiento'
import VerTratamiento from './pages/VerTratamiento'



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/comidas/:id' element={<Comidas />} />
      <Route path='/ejercicios/:id' element={<Ejercicios />} />
      <Route path='/medicamentos/:id' element={<Medicamentos />} />
      <Route path='/tratamiento/:id' element={<Tratamiento />} />
      <Route path='/ver-tratamiento/:id' element={<VerTratamiento />} />
    

    </Routes>
  );
}

export default App;
