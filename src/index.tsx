import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Spell from "./components/Spells/spell";
import Character from "./components/Characters/characters";
import reportWebVitals from "./reportWebVitals";
import Loginscreen from "./pages/loginscreen";
import Worlds from "./pages/worlds";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <Router>
        <Routes>
          <Route path="" element={<Loginscreen />} />
          <Route path="/worlds" element={<Worlds />} />
          <Route path="/spell" element={<Spell />} />
          <Route path="/character" element={<Character />} />
        </Routes>
      </Router>
    </div>
  </React.StrictMode>
);

reportWebVitals();
