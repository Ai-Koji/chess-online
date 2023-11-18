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
const ForumList = lazy(() => import("./component/forum-list"));
const ForumPage = lazy(() => import("./component/forum-page"));
const Login = lazy(() => import("./component/login"));
const Reg = lazy(() => import("./component/reg"));

const App = () => (
  <Routes>
    <Route path="/board" element={<Board />} /> {}
    <Route path="/debut-base" element={<DebutBase />} /> {}
    <Route path="/debut-base/debut" element={<Debut />} /> {}
    <Route path="/begin-base" element={<BeginBase />} /> {}
    <Route path="/forum" element={<Forum />} /> {}
    <Route path="/forum/forum-list" element={<ForumList />} /> {}
    <Route path="/forum/forum-list/forumpage" element={<ForumPage />} /> {}
    <Route path="/login" element={<Login />} /> {}
    <Route path="/registration" element={<Reg />} /> {}
  </Routes>
);

let root = createRoot(document.getElementById('root'));
root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
