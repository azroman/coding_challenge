import React from 'react';
import PoolObjects from './features/pool-objects/PoolObjects';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="App-header">
        <PoolObjects />
      </header>
    </div>
  );
}

export default App;
