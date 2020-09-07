import React from 'react';
import './styles/App.scss';
import Grid from './GameOfLife/Grid';
import Interface from './GameOfLife/Interface';

function App() {
  return (
    <div className="App">
      <Interface />
      <Grid />
    </div>
  );
}

export default App;
