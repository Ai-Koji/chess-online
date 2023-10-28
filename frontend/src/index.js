// index.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom'
import "./styles/main.css";

import Board from "./component/board";
import DebutBase from "./component/debut-base"
import BeginBase from "./component/begin-base"

const App = () => (
  <Routes>
    <Route path="/board" element={<Board />} /> {}
    <Route path="/debut-base" element={<DebutBase />} /> {}
    <Route path="/begin-base" element={<BeginBase />} /> {}
  </Routes>
);

let root = createRoot(document.getElementById('root'));
root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
