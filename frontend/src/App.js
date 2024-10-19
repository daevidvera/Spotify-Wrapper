import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element= {<LoginPage/>}/>
      </Routes>
      <div class="container">
        <div class="App-background">    
        </div> 
      </div>
    </div>
  );
}

export default App;
