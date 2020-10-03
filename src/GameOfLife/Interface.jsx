import React, { useState } from 'react';
import Generator from './Generator';

const Interface = props => {
  
  let numRows = 30;
  let numCols = 30;
  let numGenerations = 30;
  const [start, setStart] = useState(false);



  const startGenerating = () => {
    setStart(true);
  };

  const populateGrid = () => {

  };

  return (
    <>
      <div>
        <button className="btn-seed" onClick={populateGrid}>
          Seed
        </button>
        <button className="btn-start" onClick={startGenerating}>
          Start
        </button>
      </div>
      <Generator 
        numRows={numRows}
        numCols={numCols}
        seedChance={0.4}
        numGenerations={numGenerations}
        start={start}
        speed={900}
      />
    </>
  );
}

export default Interface;
