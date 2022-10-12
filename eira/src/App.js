import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Comidas from './pages/Comidas'
import Ejercicios from './pages/Ejercicios'
import Medicamentos from './pages/Medicamentos'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/comidas' element={<Comidas />} />
      <Route path='/ejercicios' element={<Ejercicios />} />
      <Route path='/medicamentos' element={<Medicamentos />} />

    </Routes>
  );
}

export default App;
