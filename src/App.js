import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import NoteState from "./Context/notes/Notestate";
import Alert from "./Components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert message="This is amazing."/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
