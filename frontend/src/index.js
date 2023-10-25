// index.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom'
import "./styles/main.css";

import Board from "./component/board";

const App = () => (
  <Routes>
    <Route path="/" element={<Board />} /> {/* Путь должен быть "path" вместо "exact path" */}
  </Routes>
);

let root = createRoot(document.getElementById('root'));
root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
