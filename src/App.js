import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import About from "./routes/about";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import Personal from "./routes/Personal";
import Team from "./routes/Team";

function App() {
  const[alert, setAlert] = useState(null);
  const showAlert = (message, type) =>{
    setAlert({
      msg : message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team showAlert={showAlert} />} />
          <Route path="personal" element={<Personal showAlert={showAlert} />} />
          <Route path="login" element={<Login showAlert={showAlert}/>} />
          <Route path="signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
