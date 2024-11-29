import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Spell from "./components/Spells/spell";
import Character from "./components/Characters/characters";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <Router>
        <Routes>
          <Route path="/spell" element={<Spell />} />
          <Route path="/character" element={<Character />} />
        </Routes>
      </Router>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
