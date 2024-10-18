import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home/Home";
import Cadastro from "./pages/Inscrição/Inscrição";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inscrição" element={<Cadastro />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
