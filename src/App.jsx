import CanvasModel from './canvas';
import { Canvas } from '@react-three/fiber';
import Customizer from './pages/Customizer'
import Home from './pages/Home'
import Login from './pages/Login';

function App() {
  

  return (
    <main className="app transition-all ease-in">
  
      <Home />
      <CanvasModel />
      <Customizer />
      
      
    </main>
   

  )
}

export default App
