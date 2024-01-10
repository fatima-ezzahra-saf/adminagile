
import './App.css';
import Fichier from './Components/Fichier';
import Part from './Components/Part';
import Slider from './Components/Slider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>


<Router>
         <Routes>
         <Route path='/' Component={Slider}></Route>
         <Route path='/part' Component={Part}></Route>
         <Route path='/file' Component={Fichier}></Route>

    </Routes>
      </Router>
</>
  );
}

export default App;
