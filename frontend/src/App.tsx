import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home'
import Login from 'pages/Login';
import Register from 'pages/Register';
import CreateRestaurant from 'pages/CreateRestaurant';
import Profile from 'pages/Profile';
import RestaurantePage from 'pages/RestaurantePage';
import OwnerDashboard from 'pages/ManageRestaurant';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/registro' element={<Register/>}/>
      <Route path='/restaurante/criar/' element={<CreateRestaurant/>}/>
      <Route path='/usuario/' element={<Profile/>}/>
      <Route path='/restaurante/visualizar' element={<RestaurantePage/>}/>
      <Route path='/restaurante/gerenciar/' element={<OwnerDashboard/>}/>
    </Routes>
  );
}

export default App;
