import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import profilePage from './components/profilePage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element= {<LoginPage/>}/>
        <Route path="/profilePage" element ={<profilePage/>} />
      </Routes>
    </div>
  );
}

export default App;
