import React from 'react';
import './styles/App.scss';
import Generator from './GameOfLife/Generator';
import Interface from './GameOfLife/Interface';

function App() {
  return (
    <div className="App">
      <Interface />
      <Generator />
    </div>
  );
}

export default App;
