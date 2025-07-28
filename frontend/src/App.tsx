import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home'
import Register from 'pages/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  );
}

export default App;
