import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Home } from './Components/Home';
import { About } from './Components/About';
import NoteState from './Context/notes/Notestate';


function App() {
  return (
     <>
     <NoteState>
       <Navbar/>
   
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />

       </Routes>
     
      </NoteState>
    </>
  );
}

export default App;
