// index.js
import React, {lazy} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom'
import "./styles/main.css";


const Board = lazy(() => import("./component/board"));
const DebutBase = lazy(() => import("./component/debut-base"));
const Debut = lazy(() => import("./component/debut"));
const BeginBase = lazy(() => import("./component/begin-base"));
const Forum = lazy(() => import("./component/forum"));

const App = () => (
  <Routes>
    <Route path="/board" element={<Board />} /> {}
    <Route path="/debut-base" element={<DebutBase />} /> {}
    <Route path="/debut-base/debut" element={<Debut />} /> {}
    <Route path="/begin-base" element={<BeginBase />} /> {}
    <Route path="/forum" element={<Forum />} /> {}
  </Routes>
);

let root = createRoot(document.getElementById('root'));
root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
