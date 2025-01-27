import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Home } from './Components/Home';
import { About } from './Components/About';


function App() {
  return (
     <>
     <Navbar/>
   
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />

       </Routes>
     

    </>
  );
}

export default App;
