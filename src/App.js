import React from 'react';
import './reset.css';
import './App.css';
import './styles/sweetAlert.css'; 
import Header from './Components/Header/Header';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
